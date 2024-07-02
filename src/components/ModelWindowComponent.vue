<template>
  <div :class="[props.containerClass, currentAnimation, props.customClass]">
    <canvas :class="props.canvasClass"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const props = defineProps<{
  canvasClass: string;
  customClass?: string;
  modelPath: string;
  containerClass: string;
  animation: "ff" | "tablet";
  cameraPosition: {
    x: number;
    y: number;
    z: number;
  };
  modelPosition: {
    x: number;
    y: number;
    z: number;
  };
  lockedPreview?: boolean;
  controls?: boolean;
  videoSrc?: string;
  resizeMax?: number;
}>();

const animationList = defineModel<string[]>();

let currentAnimation = ref("");

let canvas = document.querySelector(`.${props.canvasClass}`);
let model: any;

let vid = document.createElement("video");
vid.src = props.videoSrc || "./test_vid.mp4";
vid.muted = true;
vid.autoplay = true;
vid.loop = true;
vid.play();

watch(
  animationList,
  (newValue) => {
    if (newValue && newValue.length > 0) {
      if (props.lockedPreview) {
        currentAnimation.value = "animation-entry";
      } else {
        currentAnimation.value = newValue[0];
      }
      if (animationList.value) {
        animationList.value.shift();
      }
    }
  },
  { deep: true }
);

/**
 * Textures
 */

let vidTexture = new THREE.VideoTexture(vid);

vidTexture.colorSpace = THREE.SRGBColorSpace;
vidTexture.minFilter = THREE.LinearFilter;
vidTexture.magFilter = THREE.LinearFilter;
vidTexture.generateMipmaps = true;

watch(
  () => props.videoSrc,
  () => {
    if (props.canvasClass === "tablet" && props.videoSrc) {
      vidTexture.dispose();
      vid.src = props.videoSrc || "./test_vid.mp4";

      // Waiting for show animation to play
      setTimeout(() => {
        vid.play();
      }, 500);

      vidTexture = new THREE.VideoTexture(vid);
      vidTexture.colorSpace = THREE.SRGBColorSpace;
      vidTexture.wrapS = THREE.RepeatWrapping;
      vidTexture.minFilter = THREE.LinearFilter;
      vidTexture.magFilter = THREE.LinearFilter;
      vidTexture.repeat.x = -1;

      model.children[0].traverse((el: any) => {
        if (el.name === "uploads_files_629424_mpm_F20_9") {
          const mat = new THREE.MeshBasicMaterial({
            map: vidTexture,
          });
          mat.reflectivity = 0;
          el.material = mat;
        }
      });
    }
  }
);

onMounted(() => {
  canvas = document.querySelector(`.${props.canvasClass}`);
  const modelContainer = document.querySelector(`.${props.containerClass}`);

  if (canvas !== null && modelContainer !== null) {
    // Scene
    const scene = new THREE.Scene();

    /**
     * Loaders
     */
    // GLTF loader
    const gltfLoader = new GLTFLoader();

    // Draco loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("draco/");
    gltfLoader.setDRACOLoader(dracoLoader);

    /**
     * Object
     */

    const light = new THREE.AmbientLight("#fdfbd3", 15); // soft white light
    scene.add(light);

    /**
     * Sizes
     */
    const sizes = {
      width: modelContainer.clientWidth,
      height: modelContainer.clientHeight,
      modelRatio: 9 / 16,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      if (props.resizeMax) {
        sizes.width =
          modelContainer.clientWidth > props.resizeMax
            ? props.resizeMax
            : modelContainer.clientWidth;
        sizes.height =
          modelContainer.clientHeight > props.resizeMax
            ? props.resizeMax
            : modelContainer.clientHeight;
      } else {
        sizes.width = modelContainer.clientWidth;
        sizes.height = modelContainer.clientHeight;
      }

      // Update camera
      camera.aspect = sizes.width / sizes.height;

      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      window.innerWidth < 958 ? 60 : 50,
      sizes.width / sizes.height,
      0.01,
      1000
    );
    camera.position.x = props.cameraPosition.x;
    camera.position.y = props.cameraPosition.y;
    camera.position.z = props.cameraPosition.z;
    scene.add(camera);

    gltfLoader.load(`${props.modelPath}`, (gltf) => {
      // uploads_files_629424_mpm_F20_9
      model = gltf.scene;

      gltf.scene.position.x = props.modelPosition.x;
      gltf.scene.position.y = props.modelPosition.y;
      gltf.scene.position.z = props.modelPosition.z;

      model.children[0].traverse((el: any) => {
        if (el.name === "uploads_files_629424_mpm_F20_9") {
          el.material = new THREE.MeshBasicMaterial({
            map: vidTexture,
          });
        } else if (el.name === "Curve") {
          el.material = new THREE.MeshMatcapMaterial({
            color: "#B3BFC8",
          });
        }
      });
      scene.add(gltf.scene);
    });

    // Controls
    let controls: OrbitControls;
    if (props.controls) {
      controls = new OrbitControls(camera, canvas as HTMLElement);
      controls.enableDamping = true;
    }

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.capabilities.getMaxAnisotropy();

    /**
     * Animate
     */

    if (props.animation === "ff") {
      window.addEventListener("mousemove", (event) => {
        if (model) {
          model.rotation.y = (event.clientX / window.innerWidth - 0.5) * 1.3;
          model.rotation.x = (event.clientY / window.innerHeight - 0.5) / 3;

          camera.rotation.y = (event.clientX / window.innerWidth - 0.5) / 6;
          camera.rotation.x = (event.clientY / window.innerHeight - 0.5) / 3;
          camera.rotation.z = (event.clientY / window.innerHeight - 0.5) / 2;
        }
      });
    } else if (props.animation === "tablet") {
      window.addEventListener("mousemove", (event) => {
        if (model && window.innerWidth > 768) {
          model.rotation.x = (event.clientY / window.innerHeight - 0.5) * 0.8;
          model.rotation.z = -(event.clientX / window.innerWidth - 0.5);
        }
      });
    }

    const tick = () => {
      // Update controls
      if (props.controls) {
        controls.update();
      }

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
});
</script>
