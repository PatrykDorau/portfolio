import { animate } from "motion-v";

export function useMagnetEffect() {
  const magnetEffect = (event: MouseEvent, childSelector: string) => {
    const container = event.currentTarget as HTMLElement;
    const child = container.querySelector(childSelector);

    if (container && child) {
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const linkContainerCenterY = containerRect.top + containerRect.height / 2;

      const offsetX = Math.min(
        Math.max(
          ((event.clientX - containerCenterX) / containerRect.width) * 30,
          -10
        ),
        10
      );
      const offsetY = Math.min(
        Math.max(
          ((event.clientY - linkContainerCenterY) / containerRect.height) * 30,
          -10
        ),
        10
      );
      animate(
        child,
        { x: offsetX, y: offsetY },
        { type: "spring", stiffness: 250 }
      );
    }
  };

  const resetEffect = (event: MouseEvent, childSelector: string) => {
    const container = event.currentTarget as HTMLElement;
    const image = container.querySelector(childSelector);

    if (image) {
      animate(image, { x: 0, y: 0 }, { type: "spring", damping: 5 });
    }
  };

  return {
    magnetEffect,
    resetEffect,
  };
}
