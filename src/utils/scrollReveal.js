import ScrollReveal from 'scrollreveal';

const isScroll = typeof window === 'undefined';
const revealOnScroll = isScroll ? null : ScrollReveal();

export default revealOnScroll;