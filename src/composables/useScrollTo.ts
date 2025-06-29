// src/composables/useScrollTo.ts

export function useScrollTo() {
  const scrollTo = (scrollId: string) => {
    let el = document.querySelector(`[data-nav-id="${scrollId}"]`);
    if (el) {
      const elementRect = el.getBoundingClientRect();

      const targetScrollPosition = window.scrollY + elementRect.top - 50;

      window.scrollTo({
        top: targetScrollPosition,
        behavior: "smooth",
      });
    } else {
      console.warn(
        `Element with data-nav-id="${scrollId}" not found for scrolling.`
      );
    }
  };

  return {
    scrollTo,
  };
}
