// src/composables/useCalculateWavePath.ts

export function useCalculateScrollProgress() {
  const getElementScrollProgress = (
    currentScrollY: number,
    element: HTMLElement | null
  ): number => {
    if (!element) {
      // Optionally, you might log a warning or throw an error here depending on your error handling strategy
      console.warn("getElementScrollProgress: Target element is null.");
      return 0;
    }

    const elementHeight = element.offsetHeight;
    const elementTop = element.offsetTop; // This is the 'start' of the element for scroll calculation

    // The 'end' of the element for scroll calculation
    const elementBottom = elementTop + elementHeight;

    // Calculate the raw progress:
    // (current scroll position - element's top) / (element's total height)
    const rawProgress =
      (currentScrollY - elementTop) / (elementBottom - elementTop);

    // Clamp the progress between 0 and 1 to ensure it stays within bounds
    return Math.min(1, Math.max(0, rawProgress));
  };

  return {
    getElementScrollProgress,
  };
}
