<template>
  <div :class="[props.containerClass, currentAnimation, props.customClass]">
    <div v-if="isLoading" class="loader__wrapper">
      <div class="loader"></div>
    </div>
    <canvas :class="props.canvasClass"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, onUnmounted, computed } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// --- Component Props ---
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

// --- Reactive State ---
const videoControls = defineModel<{
  status: string;
  forwards: boolean;
  backwards: boolean;
}>("videoControls");
const animationList = defineModel<string[]>();
const currentAnimation = ref("");

let isLoading = ref(true);
let modelLoaded = ref(false);
let videosLoaded = ref(false);

const overallLoading = computed(
  () => !modelLoaded.value || !videosLoaded.value
);

watch(overallLoading, (isStillLoading) => {
  isLoading.value = isStillLoading; // Sync component's isLoading with overall progress
});

watch(
  videoControls,
  (nV) => {
    if (nV?.status === "pause") {
      vid.pause();
    } else if (nV?.status === "play") {
      vid.play();
    }

    if (nV?.forwards) {
      vid.currentTime = Math.max(0, vid.currentTime + 5);
      nV.forwards = false;
    } else if (nV?.backwards) {
      vid.currentTime = Math.max(0, vid.currentTime - 5);
      nV.backwards = false;
    }
  },
  {
    deep: true,
  }
);

// --- Three.js Variables (Declared at top scope for component-wide access and cleanup) ---
let canvas: HTMLCanvasElement | null = null;
let modelContainer: HTMLElement | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let controls: OrbitControls | null = null;
let model: THREE.Object3D | null = null;
let animationFrameId: number | null = null;

// New state for animation:
let isReturningToDefault = false; // Flag to indicate if the model should animate back
const animationFactor = 0.05; // Lerp interpolation factor (0 to 1, higher means faster)

// Define target rotations and positions for easier use in lerp
const targetModelRotation = new THREE.Euler(0, 0, 0); // Default rotations
let targetModelPosition: THREE.Vector3;
let targetCameraPosition: THREE.Vector3;

// --- Video Elements & Textures ---
const vid = document.createElement("video");
const loader = document.createElement("video");

let loaderTexture: THREE.VideoTexture | null = null;
let vidTexture: THREE.VideoTexture | null = null;

// --- Utility Functions ---

/**
 * Initializes and configures the video elements (hidden, muted, autoplay, loop).
 * Appends them to the body so they can load and play.
 */
// const setupVideoElements = () => {
//   // Loader video setup
//   loader.src = "loader.mp4";
//   loader.muted = true;
//   loader.autoplay = true;
//   loader.loop = true;
//   loader.playsInline = true; // Important for mobile browsers
//   loader.style.display = "none"; // Hide the video element
//   document.body.appendChild(loader);

//   // Main video setup
//   if (props.videoSrc) {
//     vid.src = props.videoSrc;
//   }
//   vid.muted = true;
//   vid.autoplay = true;
//   vid.loop = true;
//   vid.playsInline = true; // Important for mobile browsers
//   vid.style.display = "none"; // Hide the video element
//   document.body.appendChild(vid);

//   // Attempt to play them. These will resolve if allowed, or catch errors.
//   loader
//     .play()
//     .catch((e) => console.error("Error playing initial loader video:", e));
//   if (props.videoSrc) {
//     vid
//       .play()
//       .catch((e) => console.error("Error playing initial main video:", e));
//   }
// };

const setupVideoElements = async () => {
  // Loader video setup
  loader.src = "loader.mp4";
  loader.muted = true;
  loader.autoplay = false; // We will play it manually after preloading
  loader.loop = true;
  loader.playsInline = true;
  loader.style.display = "none";
  document.body.appendChild(loader);

  // Main video setup
  if (props.videoSrc) {
    vid.src = props.videoSrc;
  }
  vid.muted = true;
  vid.autoplay = false; // We will play it manually after preloading
  vid.loop = true;
  vid.playsInline = true;
  vid.style.display = "none";
  document.body.appendChild(vid);

  // Preload both videos concurrently
  try {
    await Promise.all([
      preloadVideo(loader),
      props.videoSrc ? preloadVideo(vid) : Promise.resolve(vid), // Only preload vid if src exists
    ]);

    videosLoaded.value = true;
    // Now that they are preloaded, you can attempt to play them if needed immediately
    // For setupVideoElements, you might not want to play them immediately if they are for textures.
    // The play calls here are mostly for unblocking autoplay policies.
    loader
      .play()
      .catch((e) => console.error("Error playing initial loader video:", e));
    if (props.videoSrc) {
      vid
        .play()
        .catch((e) => console.error("Error playing initial main video:", e));
    }
  } catch (error) {
    console.error("One or more initial videos failed to preload:", error);
    // Fallback or error handling for when preloading fails
  }

  // Initialize textures after videos are ready
  // This part is crucial for making sure the textures are ready when applyScreenTexture is called
  loaderTexture = new THREE.VideoTexture(loader);
  loaderTexture.colorSpace = THREE.SRGBColorSpace;
  // ... (set other loaderTexture properties if needed)

  if (props.videoSrc) {
    vidTexture = new THREE.VideoTexture(vid);
    vidTexture.colorSpace = THREE.SRGBColorSpace;
    vidTexture.wrapS = THREE.RepeatWrapping;
    vidTexture.minFilter = THREE.LinearFilter;
    vidTexture.magFilter = THREE.LinearFilter;
    vidTexture.repeat.x = -1;
    vidTexture.offset.x = 1;
    vidTexture.generateMipmaps = true;
    vidTexture.offset.set(-0.008, 0.008);
  }
};

/**
 * Updates the Three.js canvas and camera based on container size.
 */
const handleResize = () => {
  if (!modelContainer || !camera || !renderer) {
    console.warn("Resize aborted: Three.js elements not ready.");
    return;
  }

  let width = modelContainer.clientWidth;
  let height = modelContainer.clientHeight;

  if (props.resizeMax) {
    width = Math.min(width, props.resizeMax);
    height = Math.min(height, props.resizeMax);
  }

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

/**
 * Applies the correct video texture to the model's screen mesh.
 * @param texture The THREE.VideoTexture to apply.
 */
const applyScreenTexture = (texture: THREE.VideoTexture) => {
  if (!model) return;

  model.traverse((el: any) => {
    if (el.isMesh && el.name === "uploads_files_629424_mpm_F20_9") {
      if (!el.material) {
        el.material = new THREE.MeshBasicMaterial();
      }
      el.material.map = texture;
      el.material.reflectivity = 0;
      el.material.needsUpdate = true;
    }
  });
};

const preloadVideo = (videoElement: HTMLVideoElement) => {
  return new Promise((resolve, reject) => {
    // Set preload attribute for browser hint
    videoElement.preload = "auto";

    // Event listener for when the video can play through without buffering
    videoElement.addEventListener(
      "canplaythrough",
      () => {
        console.log(`${videoElement.src} is ready to play through.`);
        resolve(videoElement);
      },
      { once: true }
    ); // Use { once: true } to automatically remove the listener after it fires

    // Error handling
    videoElement.addEventListener(
      "error",
      (e) => {
        console.error(`Error preloading video ${videoElement.src}:`, e);
        reject(e);
      },
      { once: true }
    );

    // Explicitly load the video
    // This needs to be called AFTER setting the src if it's dynamic
    if (videoElement.src) {
      videoElement.load();
    } else {
      // If src is not set, resolve immediately or reject if it's a critical video
      resolve(videoElement);
    }
  });
};

/**
 * Handles updates to props.videoSrc, switching the screen texture.
 */
// const updateVideoTextureOnModel = () => {
//   if (props.canvasClass !== "tablet") {
//     return;
//   }

//   if (vidTexture) {
//     vidTexture.dispose();
//     vidTexture = null;
//   }

//   if (loaderTexture) {
//     applyScreenTexture(loaderTexture);
//     loader
//       .play()
//       .catch((e) => console.error("Error playing loader video on update:", e));
//   }

//   if (props.videoSrc) {
//     vid.src = props.videoSrc;
//     vid.load();
//     vid.onloadeddata = () => {
//       vidTexture = new THREE.VideoTexture(vid);
//       vidTexture.colorSpace = THREE.SRGBColorSpace;
//       vidTexture.wrapS = THREE.RepeatWrapping;
//       vidTexture.minFilter = THREE.LinearFilter;
//       vidTexture.magFilter = THREE.LinearFilter;
//       vidTexture.repeat.x = -1;
//       vidTexture.offset.x = 1;
//       vidTexture.generateMipmaps = true;
//       vidTexture.offset.set(-0.008, 0.008);
//       vid.playbackRate = 0.85;

//       applyScreenTexture(vidTexture);

//       loader.pause();
//       loader.currentTime = 0;
//       setTimeout(() => {
//         vid
//           .play()
//           .catch((e) =>
//             console.error("Error playing main video after texture update:", e)
//           );
//       }, 100);
//     };
//     vid.onerror = (e) => {
//       console.error("Error loading main video:", e);
//       if (loaderTexture) {
//         applyScreenTexture(loaderTexture);
//         loader
//           .play()
//           .catch((e) =>
//             console.error(
//               "Error playing loader video after main video load error:",
//               e
//             )
//           );
//       }
//     };
//   } else {
//     if (loaderTexture) {
//       applyScreenTexture(loaderTexture);
//       loader
//         .play()
//         .catch((e) =>
//           console.error("Error playing loader video when videoSrc is null:", e)
//         );
//     }
//     vid.pause();
//     vid.currentTime = 0;
//   }
// };

// --- Watchers ---

const updateVideoTextureOnModel = async () => {
  // Make this async
  if (props.canvasClass !== "tablet") {
    return;
  }

  if (vidTexture) {
    vidTexture.dispose();
    vidTexture = null;
  }

  if (loaderTexture) {
    applyScreenTexture(loaderTexture);
    // Since loader is already preloaded, we just need to play it
    loader
      .play()
      .catch((e) => console.error("Error playing loader video on update:", e));
  }

  if (props.videoSrc) {
    // If the video source changes, we need to re-preload/load it
    if (vid.src !== props.videoSrc) {
      // Only update if the source has actually changed
      vid.src = props.videoSrc;
      try {
        await preloadVideo(vid); // Wait for the new video to preload
      } catch (e) {
        console.error("Error preloading new main video:", e);
        // Fallback to loader if the main video fails to preload
        if (loaderTexture) {
          applyScreenTexture(loaderTexture);
          loader
            .play()
            .catch((e) =>
              console.error(
                "Error playing loader video after new main video preload error:",
                e
              )
            );
        }
        return; // Stop execution if preload failed
      }
    }

    // if (vidTexture) { // Dispose existing texture if src changed and we're recreating
    //     vidTexture.dispose();
    // }
    vidTexture = new THREE.VideoTexture(vid);
    vidTexture.colorSpace = THREE.SRGBColorSpace;
    vidTexture.wrapS = THREE.RepeatWrapping;
    vidTexture.minFilter = THREE.LinearFilter;
    vidTexture.magFilter = THREE.LinearFilter;
    vidTexture.repeat.x = -1;
    vidTexture.offset.x = 1;
    vidTexture.generateMipmaps = true;
    vidTexture.offset.set(-0.008, 0.008);
    vid.playbackRate = 0.85;

    applyScreenTexture(vidTexture);

    loader.pause();
    loader.currentTime = 0;
    setTimeout(() => {
      vid
        .play()
        .catch((e) =>
          console.error("Error playing main video after texture update:", e)
        );
    }, 100);
  } else {
    if (loaderTexture) {
      applyScreenTexture(loaderTexture);
      loader
        .play()
        .catch((e) =>
          console.error("Error playing loader video when videoSrc is null:", e)
        );
    }
    vid.pause();
    vid.currentTime = 0;
  }
};

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

watch(() => props.videoSrc, updateVideoTextureOnModel, { immediate: true });

// --- Lifecycle Hooks ---

onMounted(() => {
  canvas = document.querySelector(`.${props.canvasClass}`) as HTMLCanvasElement;
  modelContainer = document.querySelector(
    `.${props.customClass}`
  ) as HTMLElement;

  if (
    !canvas ||
    !modelContainer ||
    modelContainer.clientWidth === 0 ||
    modelContainer.clientHeight === 0
  ) {
    console.error(
      "Three.js initialization failed: Canvas or model container not found or has zero dimensions. Check your CSS and selectors."
    );
    return;
  }

  setupVideoElements();

  loaderTexture = new THREE.VideoTexture(loader);
  loaderTexture.colorSpace = THREE.SRGBColorSpace;
  loaderTexture.minFilter = THREE.LinearFilter;
  loaderTexture.magFilter = THREE.LinearFilter;
  loaderTexture.generateMipmaps = true;
  loaderTexture.repeat.x = -1;
  loaderTexture.offset.x = 1;

  vidTexture = new THREE.VideoTexture(vid);
  vidTexture.colorSpace = THREE.SRGBColorSpace;
  vidTexture.minFilter = THREE.LinearFilter;
  vidTexture.magFilter = THREE.LinearFilter;
  vidTexture.generateMipmaps = true;
  vidTexture.repeat.x = -1;
  vidTexture.offset.x = 1;

  // --- Scene Setup ---
  scene = new THREE.Scene();
  const light = new THREE.AmbientLight("#fdfbd3", 12);
  scene.add(light);

  // --- Loaders Setup ---
  const gltfLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  gltfLoader.setDRACOLoader(dracoLoader);

  // --- Camera Setup ---
  const initialSizes = {
    width: modelContainer.clientWidth,
    height: modelContainer.clientHeight,
  };
  camera = new THREE.PerspectiveCamera(
    window.innerWidth < 958 ? 60 : 50,
    initialSizes.width / initialSizes.height,
    0.01,
    1000
  );
  camera.position.set(
    props.cameraPosition.x,
    props.cameraPosition.y,
    props.cameraPosition.z
  );
  scene.add(camera);

  // Initialize target positions
  targetModelPosition = new THREE.Vector3(
    props.modelPosition.x,
    props.modelPosition.y,
    props.modelPosition.z
  );
  targetCameraPosition = new THREE.Vector3(
    props.cameraPosition.x,
    props.cameraPosition.y,
    props.cameraPosition.z
  );

  // --- Renderer Setup ---
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(initialSizes.width, initialSizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;

  // --- Model Loading ---
  gltfLoader.load(props.modelPath, (gltf) => {
    model = gltf.scene;

    model.position.set(
      props.modelPosition.x,
      props.modelPosition.y,
      props.modelPosition.z
    );
    // Initial rotation should also be 0,0,0 or whatever default you want
    model.rotation.set(0, 0, 0);

    model.traverse((el: any) => {
      if (el.isMesh) {
        if (el.name === "uploads_files_629424_mpm_F20_9") {
          el.material = new THREE.MeshBasicMaterial({
            map: props.videoSrc && vidTexture ? vidTexture : loaderTexture,
          });
          el.material.reflectivity = 0;
        } else if (el.name === "Curve") {
          el.material = new THREE.MeshMatcapMaterial({
            color: "#B3BFC8",
          });
        }
      }
    });

    scene!.add(model);
    modelLoaded.value = true;
  });

  // --- Controls Setup ---
  if (props.controls) {
    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableRotate = false; // Keep rotation disabled if that's your intention

    // --- Changes for Subtle Zoom ---
    controls.enableZoom = false; // Ensure zoom is enabled (it's true by default, but good to be explicit)
  }

  // --- Event Listeners ---
  window.addEventListener("resize", handleResize);

  if (props.animation === "ff") {
    const handleFFMouseMove = (event: MouseEvent) => {
      if (model && camera) {
        model.rotation.y = (event.clientX / window.innerWidth - 0.5) * 1.3;
        model.rotation.x = (event.clientY / window.innerHeight - 0.5) / 3;

        camera.rotation.y = (event.clientX / window.innerWidth - 0.5) / 6;
        camera.rotation.x = (event.clientY / window.innerHeight - 0.5) / 3;
        camera.rotation.z = (event.clientY / window.innerHeight - 0.5) / 2;
      }
    };
    window.addEventListener("mousemove", handleFFMouseMove);
    (window as any)._handleFFMouseMove = handleFFMouseMove;
  } else if (props.animation === "tablet") {
    const handleTabletMouseMove = (event: MouseEvent) => {
      isReturningToDefault = false; // Stop return animation on mouse movement
      if (model && window.innerWidth > 768 && modelContainer) {
        // Use offsetX and offsetY relative to the event target (modelContainer)
        const normalizedX = event.offsetX / modelContainer.clientWidth - 0.5;
        const normalizedY = event.offsetY / modelContainer.clientHeight - 0.5;

        model.rotation.x = normalizedY * 0.4;
        model.rotation.z = -normalizedX * 0.4;
      }
    };

    const handleTabletMouseLeave = () => {
      if (!model || !camera) return;
      console.log("Mouse left model container, returning to default.");
      isReturningToDefault = true; // Start return animation
    };

    if (modelContainer) {
      console.dir(modelContainer);
      modelContainer.addEventListener("mousemove", handleTabletMouseMove);
      (modelContainer as any)._handleTabletMouseMove = handleTabletMouseMove;

      modelContainer.addEventListener("mouseleave", handleTabletMouseLeave);
      (modelContainer as any)._handleTabletMouseLeave = handleTabletMouseLeave;
    }
  }

  // --- Animation Loop ---
  const animate = () => {
    if (!renderer || !scene || !camera) {
      console.warn("Animation loop skipped: Three.js elements not ready.");
      return;
    }

    if (isReturningToDefault && model && camera) {
      // Lerp model rotation back to default (0, 0, 0)
      // Use Three.js's built-in lerp functions for Vectors/Eulers
      model.rotation.x = THREE.MathUtils.lerp(
        model.rotation.x,
        targetModelRotation.x,
        animationFactor
      );
      model.rotation.y = THREE.MathUtils.lerp(
        model.rotation.y,
        targetModelRotation.y,
        animationFactor
      );
      model.rotation.z = THREE.MathUtils.lerp(
        model.rotation.z,
        targetModelRotation.z,
        animationFactor
      );

      // Lerp model position back to props.modelPosition
      model.position.lerp(targetModelPosition, animationFactor);

      // Lerp camera position back to props.cameraPosition
      camera.position.lerp(targetCameraPosition, animationFactor);

      // --- Stopping Condition ---
      const rotationThreshold = 0.0001; // radians, very small to ensure it gets close
      const positionThreshold = 0.001; // units

      const modelRotationNearTarget =
        Math.abs(model.rotation.x - targetModelRotation.x) <
          rotationThreshold &&
        Math.abs(model.rotation.y - targetModelRotation.y) <
          rotationThreshold &&
        Math.abs(model.rotation.z - targetModelRotation.z) < rotationThreshold;

      const modelPositionNearTarget =
        model.position.distanceTo(targetModelPosition) < positionThreshold;

      const cameraPositionNearTarget =
        camera.position.distanceTo(targetCameraPosition) < positionThreshold;

      if (
        modelRotationNearTarget &&
        modelPositionNearTarget &&
        cameraPositionNearTarget
      ) {
        isReturningToDefault = false;
        // Snap to exact values to prevent floating point inaccuracies
        if (model) {
          model.rotation.copy(targetModelRotation); // Use copy for Euler
          model.position.copy(targetModelPosition); // Use copy for Vector3
        }
        if (camera) {
          camera.position.copy(targetCameraPosition); // Use copy for Vector3
        }
      }
    }

    if (controls) {
      controls.update();
    }

    renderer.render(scene, camera);
    animationFrameId = window.requestAnimationFrame(animate);
  };

  animate();
});

onUnmounted(() => {
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
  }

  window.removeEventListener("resize", handleResize);

  if ((window as any)._handleFFMouseMove) {
    window.removeEventListener("mousemove", (window as any)._handleFFMouseMove);
  }
  if (modelContainer && (modelContainer as any)._handleTabletMouseMove) {
    modelContainer.removeEventListener(
      "mousemove",
      (modelContainer as any)._handleTabletMouseMove
    );
  }
  if (modelContainer && (modelContainer as any)._handleTabletMouseLeave) {
    modelContainer.removeEventListener(
      "mouseleave",
      (modelContainer as any)._handleTabletMouseLeave
    );
  }

  if (scene) {
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        (object as THREE.Mesh).geometry.dispose();
        if (Array.isArray((object as THREE.Mesh).material)) {
          ((object as THREE.Mesh).material as THREE.Material[]).forEach(
            (material) => material.dispose()
          );
        } else if ((object as THREE.Mesh).material) {
          ((object as THREE.Mesh).material as THREE.Material).dispose();
        }
      }
    });
    scene.clear();
  }

  if (renderer) {
    renderer.dispose();
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  }

  if (controls) {
    controls.dispose();
  }

  if (vidTexture) vidTexture.dispose();
  if (loaderTexture) loaderTexture.dispose();

  if (vid && vid.parentNode) {
    vid.pause();
    vid.removeAttribute("src");
    vid.load();
    vid.parentNode.removeChild(vid);
  }
  if (loader && loader.parentNode) {
    loader.pause();
    loader.removeAttribute("src");
    loader.load();
    loader.parentNode.removeChild(loader);
  }
});
</script>

<style lang="scss" scoped>
.loader__wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, grey 94%, #0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, grey);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: l13 1s infinite linear;
}
@keyframes l13 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
