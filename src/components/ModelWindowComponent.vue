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
let loader = document.createElement("video");

loader.src = "loader.mp4";
loader.muted = true;
loader.autoplay = true;
loader.loop = true;
loader.play();

if (props.videoSrc) {
  console.log(props.videoSrc);
  vid.src = props.videoSrc;
  vid.muted = true;
  vid.autoplay = true;
  vid.loop = true;
  vid.play();
}

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

let loaderTexture = new THREE.VideoTexture(loader);
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

      const aspectRatio = loader.videoWidth / loader.videoHeight;
      loaderTexture.repeat.set(1, aspectRatio);
      loaderTexture.offset.set(0, (1 - aspectRatio) / 2);

      model.children[0].traverse((el: any) => {
        if (el.name === "uploads_files_629424_mpm_F20_9") {
          const mat = new THREE.MeshBasicMaterial({
            map: loaderTexture,
          });
          mat.reflectivity = 0;
          el.material = mat;
        }
      });

      vid.src = props.videoSrc;
      vid.muted = true;
      vid.autoplay = true;
      vid.loop = true;

      vid.onloadeddata = () => {
        // Wait for show animation to play
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
        setTimeout(() => {
          vid.play();
        }, 500);
      };
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

<!-- <template>
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
  cameraPosition: { x: number; y: number; z: number };
  modelPosition: { x: number; y: number; z: number };
  lockedPreview?: boolean;
  controls?: boolean;
  videoSrc?: string;
  resizeMax?: number;
}>();

const animationList = defineModel<string[]>();
const currentAnimation = ref("");

let canvas: HTMLCanvasElement | null = null;
let model: THREE.Group | null = null;

const loaderVideo = document.createElement("video");
const userVideo = document.createElement("video");

initVideoElement(loaderVideo, "loader.mp4");

if (props.videoSrc) {
  initVideoElement(userVideo, props.videoSrc);
}

const loaderTexture = new THREE.VideoTexture(loaderVideo);
let vidTexture = new THREE.VideoTexture(userVideo);
configureVideoTexture(vidTexture);

/**
 * Animation watcher
 */
watch(
  animationList,
  (newValue) => {
    if (newValue?.length) {
      currentAnimation.value = props.lockedPreview
        ? "animation-entry"
        : newValue[0];
      animationList.value?.shift();
    }
  },
  { deep: true }
);

/**
 * Update texture on video source change
 */
watch(
  () => props.videoSrc,
  async (newSrc) => {
    if (!model || props.canvasClass !== "tablet" || !newSrc) return;

    // Stop and reset the old video
    userVideo.pause();
    userVideo.removeAttribute("src");
    userVideo.load();
    vidTexture.dispose();

    // Load the new video
    await new Promise<void>((resolve) => {
      userVideo.src = newSrc;
      userVideo.muted = true;
      userVideo.loop = true;

      userVideo.onloadeddata = () => {
        resolve();
      };

      userVideo.load();
    });

    await userVideo.play().catch(console.warn);

    // Only now we create the new texture
    vidTexture = new THREE.VideoTexture(userVideo);
    configureVideoTexture(vidTexture);
    vidTexture.repeat.x = -1;

    // And update the model material if model is ready
    updateModelMaterial(
      "uploads_files_629424_mpm_F20_9",
      new THREE.MeshBasicMaterial({ map: vidTexture })
    );
  }
);

/**
 * Mount logic
 */
onMounted(() => {
  canvas = document.querySelector(`.${props.canvasClass}`);
  const modelContainer = document.querySelector(`.${props.containerClass}`);

  if (!canvas || !modelContainer) return;

  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight("#fdfbd3", 15));

  const sizes = {
    width: modelContainer.clientWidth,
    height: modelContainer.clientHeight,
  };

  const camera = createCamera(sizes);
  scene.add(camera);

  const gltfLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("draco/");
  gltfLoader.setDRACOLoader(dracoLoader);

  gltfLoader.load(props.modelPath, (gltf) => {
    model = gltf.scene;
    model.position.set(
      props.modelPosition.x,
      props.modelPosition.y,
      props.modelPosition.z
    );

    updateModelMaterial(
      "uploads_files_629424_mpm_F20_9",
      new THREE.MeshBasicMaterial({ map: vidTexture })
    );
    updateModelMaterial(
      "Curve",
      new THREE.MeshMatcapMaterial({ color: "#B3BFC8" })
    );

    scene.add(model);
  });

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  setupRenderer(renderer, sizes);

  const controls = props.controls ? new OrbitControls(camera, canvas) : null;
  if (controls) controls.enableDamping = true;

  window.addEventListener("resize", () =>
    resize(modelContainer, renderer, camera, sizes)
  );

  setupMouseAnimation(props.animation, camera);

  const animate = () => {
    controls?.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();
});

/**
 * --- Utility Functions ---
 */

function initVideoElement(
  video: HTMLVideoElement,
  src: string,
  callback?: () => void
) {
  video.src = src;
  video.muted = true;
  video.autoplay = true;
  video.loop = true;

  const onReady = () => {
    video.removeEventListener("loadeddata", onReady);
    video.play().catch(console.warn);
    callback?.();
  };

  if (video.readyState >= 2) {
    video.play().catch(console.warn);
    callback?.();
  } else {
    video.addEventListener("loadeddata", onReady);
    video.load();
  }
}

function configureVideoTexture(tex: THREE.VideoTexture) {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
}

function updateModelMaterial(name: string, material: THREE.Material) {
  model?.children[0]?.traverse((el: any) => {
    if (el.name === name) {
      el.material = material;
    }
  });
}

function createCamera(sizes: { width: number; height: number }) {
  const fov = window.innerWidth < 958 ? 60 : 50;
  const camera = new THREE.PerspectiveCamera(
    fov,
    sizes.width / sizes.height,
    0.01,
    1000
  );
  camera.position.set(
    props.cameraPosition.x,
    props.cameraPosition.y,
    props.cameraPosition.z
  );
  return camera;
}

function setupRenderer(
  renderer: THREE.WebGLRenderer,
  sizes: { width: number; height: number }
) {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
}

function resize(
  container: Element,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  sizes: { width: number; height: number }
) {
  const max = props.resizeMax ?? Infinity;
  sizes.width = Math.min(container.clientWidth, max);
  sizes.height = Math.min(container.clientHeight, max);

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function setupMouseAnimation(type: string, camera: THREE.PerspectiveCamera) {
  window.addEventListener("mousemove", (event) => {
    if (!model) return;

    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    if (type === "ff") {
      model.rotation.y = x * 1.3;
      model.rotation.x = y / 3;

      camera.rotation.y = x / 6;
      camera.rotation.x = y / 3;
      camera.rotation.z = y / 2;
    } else if (type === "tablet" && window.innerWidth > 768) {
      model.rotation.x = y * 0.8;
      model.rotation.z = -x;
    }
  });
}
</script> -->
