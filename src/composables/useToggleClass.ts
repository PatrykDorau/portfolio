// src/composables/useToggleClass.ts

export function useToggleClass() {
  const toggleClass = (elementClass: string, toggleClass: string) => {
    let el = document.querySelector(`.${elementClass}`);
    if (el) {
      el.classList.add(toggleClass);
    }
  };

  return {
    toggleClass,
  };
}
