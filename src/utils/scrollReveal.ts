/** Enhance visible content without making JavaScript a requirement for reading it. */
export function initScrollReveal() {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window)) return;

  const selectors = [
    '.hero-top > *',
    '.hero-bottom > *',
    '.intro > *',
    '.section-heading > *',
    '.section > .wrap > .eyebrow',
    '.section > .wrap > h2',
    '.section.wrap > h2',
    '.service-card',
    '.split > *',
    '.step',
    '.guide-row',
    '.wide-banner',
    '.prose > section',
    '.faq > details',
    '.cta .wrap > *',
  ];
  const candidates = [...document.querySelectorAll<HTMLElement>(selectors.join(','))];
  const candidateSet = new Set(candidates);
  // One animated ancestor per branch keeps nested content from moving twice.
  const elements = candidates.filter((element) => {
    if (element.closest('.transformation')) return false;
    for (let parent = element.parentElement; parent; parent = parent.parentElement) {
      if (candidateSet.has(parent)) return false;
    }
    return true;
  });
  const groups = new Map<Element, number>();
  elements.forEach((element) => {
    const parent = element.parentElement!;
    const index = groups.get(parent) ?? 0;
    groups.set(parent, index + 1);
    element.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 85}ms`);
    if (element.matches('.hero-image, .wide-banner, img')) element.dataset.revealKind = 'image';
  });

  let observer: IntersectionObserver | undefined;
  const reveal = (element: HTMLElement) => {
    element.classList.remove('reveal-pending');
    element.classList.add('is-revealed');
    observer?.unobserve(element);
  };
  const showAll = () => {
    observer?.disconnect();
    elements.forEach((element) => {
      element.classList.remove('reveal-pending', 'scroll-reveal', 'is-revealed');
    });
  };
  const start = () => {
    showAll();
    if (motion.matches) return;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target as HTMLElement);
          });
        },
        { threshold: 0, rootMargin: '0px 0px -24px 0px' }
      );
      elements.forEach((element) => {
        // Preserve content already passed when restoring a scroll position.
        if (element.getBoundingClientRect().bottom <= 0) return;
        element.classList.add('scroll-reveal', 'reveal-pending');
        observer!.observe(element);
      });
    } catch {
      showAll();
    }
  };
  const revealFocus = (event: FocusEvent) => {
    if (!(event.target instanceof Element)) return;
    const container = event.target.closest<HTMLElement>('.reveal-pending');
    if (container) {
      container.classList.remove('scroll-reveal');
      container.style.setProperty('--reveal-delay', '0ms');
      reveal(container);
    }
  };
  const restore = (event: PageTransitionEvent) => {
    if (event.persisted) showAll();
  };
  start();
  motion.addEventListener('change', start);
  document.addEventListener('focusin', revealFocus);
  window.addEventListener('pageshow', restore);
  return () => {
    showAll();
    motion.removeEventListener('change', start);
    document.removeEventListener('focusin', revealFocus);
    window.removeEventListener('pageshow', restore);
  };
}
