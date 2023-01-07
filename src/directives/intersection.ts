// Simple intersection directive

type IntesectionCb = () => void;

type BindingType = {
  value: IntesectionCb
}

export const vIntersection = {
  mounted(el: HTMLElement, binding: BindingType) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(binding.value, options);
    observer.observe(el);
  },
};