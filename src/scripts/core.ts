// Shared motion layer, loaded once per page by Base.astro.
// Every page is a full document load (native cross-document View Transitions),
// so this module simply runs fresh on each navigation.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
export { gsap, ScrollTrigger, SplitText };

/* ---------- smooth scroll: Lenis driven by GSAP's ticker ---------- */
export const lenis: Lenis | null = reduce ? null : new Lenis({ lerp: 0.09, smoothWheel: true });
if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  lenis ? lenis.scrollTo(el as HTMLElement, { duration: 1.6 }) : el.scrollIntoView();
}
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest('a');
  if (!a) return;
  const url = new URL(a.href, location.href);
  if (url.pathname === location.pathname && url.hash.length > 1) {
    e.preventDefault();
    history.replaceState(null, '', url.hash);
    scrollToHash(url.hash);
  }
});

/* ---------- loader (home page, first visit per session) + intro gate ---------- */
// Page scripts await `ready` before running their entrance animations.
let markReady!: () => void;
export const ready = new Promise<void>((r) => (markReady = r));

function runLoader() {
  const loader = document.querySelector<HTMLElement>('.loader');
  const firstVisit = !sessionStorage.getItem('cc-seen');
  if (!loader || !firstVisit || reduce) {
    loader?.remove();
    markReady();
    return;
  }
  sessionStorage.setItem('cc-seen', '1');
  lenis?.stop();
  const count = loader.querySelector<HTMLElement>('.count')!;
  const c = { v: 0 };
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .fromTo('.loader .ln', { yPercent: 110 }, { yPercent: 0, duration: 1 })
    .to(c, { v: 100, duration: 1.4, ease: 'power2.inOut', onUpdate: () => (count.textContent = String(Math.round(c.v)).padStart(3, '0')) }, 0)
    .to('.loader .bar', { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0)
    .to('.loader .ln', { yPercent: -110, duration: 0.7, ease: 'expo.in' }, 1.4)
    .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, 1.7)
    .add(() => { markReady(); lenis?.start(); }, 2.1)
    .add(() => loader.remove());
}
try { runLoader(); } catch { markReady(); }

/* ---------- scroll progress ---------- */
gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

/* ---------- custom cursor ---------- */
if (finePointer && !reduce) {
  document.documentElement.classList.add('has-cursor');
  const dot = document.querySelector<HTMLElement>('.cursor')!;
  const ring = document.querySelector<HTMLElement>('.cursor-ring')!;
  const label = ring.querySelector('span')!;
  const m = { x: innerWidth / 2, y: innerHeight / 2 }, r = { ...m };
  addEventListener('pointermove', (e) => { m.x = e.clientX; m.y = e.clientY; gsap.set(dot, { x: m.x, y: m.y }); });
  gsap.ticker.add(() => { r.x += (m.x - r.x) * 0.16; r.y += (m.y - r.y) * 0.16; gsap.set(ring, { x: r.x, y: r.y }); });
  document.addEventListener('pointerover', (e) => {
    const t = (e.target as Element).closest<HTMLElement>('[data-cursor], a, button');
    ring.classList.remove('big', 'link');
    if (!t) return;
    const kind = t.dataset.cursor ?? 'link';
    if (kind === 'none') return;
    ring.classList.add(kind);
    label.textContent = t.dataset.cursorLabel ?? 'View';
  });
}

/* ---------- reveals ---------- */
ready.then(() => {
  document.querySelectorAll<HTMLElement>('.label').forEach((l) =>
    gsap.from(l, { opacity: 0, x: -20, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: l, start: 'top 92%' } }));
  document.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((h) => {
    const s = new SplitText(h, { type: 'lines', mask: 'lines' });
    gsap.from(s.lines, { yPercent: 105, duration: 1.2, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 92%' } });
  });
  document.querySelectorAll<HTMLElement>('[data-reveal="fade"]').forEach((el) =>
    gsap.from(el, { opacity: 0, y: 30, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%' } }));
});

/* ---------- magnetic elements ---------- */
document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
  if (!finePointer || reduce) return;
  const inner = el.querySelector<HTMLElement>('span');
  const k = Number(el.dataset.magnetic || 0.4);
  el.addEventListener('pointermove', (e) => {
    const b = el.getBoundingClientRect(), x = e.clientX - b.left - b.width / 2, y = e.clientY - b.top - b.height / 2;
    gsap.to(el, { x: x * k, y: y * k, duration: 0.6, ease: 'expo.out' });
    if (inner) gsap.to(inner, { x: x * k * 0.5, y: y * k * 0.5, duration: 0.6, ease: 'expo.out' });
  });
  el.addEventListener('pointerleave', () => gsap.to(inner ? [el, inner] : el, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, .3)' }));
});

addEventListener('load', () => ScrollTrigger.refresh());
if (location.hash) ready.then(() => setTimeout(() => scrollToHash(location.hash), 100));
