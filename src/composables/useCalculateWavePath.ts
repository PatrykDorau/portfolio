// src/composables/useCalculateWavePath.ts

export function useCalculateWavePath() {
  const concave = [
    0, 64, 120, 101.3, 240, 139, 480, 213, 720, 208, 960, 203, 1200, 117, 1320,
    74.7, 1440, 32,
  ];
  const convex = [
    0, 192, 120, 170.7, 240, 149, 480, 107, 720, 112, 960, 117, 1200, 203, 1320,
    245.3, 1440, 288,
  ];

  function interpolatePoints(p1: any, p2: any, t: any) {
    return p1.map((v: any, i: any) => v + (p2[i] - v) * t);
  }

  function buildPath(points: any) {
    return `M${points[0]},${points[1]}L${points[2]},${points[3]}C${points[4]},${points[5]},${points[6]},${points[7]},${points[8]},${points[9]}C${points[10]},${points[11]},${points[12]},${points[13]},${points[14]},${points[15]}L${points[16]},${points[17]}L1440,320L0,320Z`;
  }

  // In useCalculateWavePath:
  let lastProgress = -1; // Keep track of the last progress
  function updateWavePath(progress: any, el: HTMLElement) {
    if (!el) return;

    if (Math.abs(progress - lastProgress) < 0.005 && lastProgress !== -1) {
      return;
    }
    lastProgress = progress;

    const interpolated = interpolatePoints(concave, convex, progress);
    el.setAttribute("d", buildPath(interpolated));
  }

  return {
    updateWavePath,
  };
}
