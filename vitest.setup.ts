import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/ko',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    to: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      add: vi.fn().mockReturnThis(),
    })),
  },
  ScrollTrigger: {
    create: vi.fn(),
    refresh: vi.fn(),
    getAll: vi.fn(() => []),
    kill: vi.fn(),
  },
}));

// Mock next-cloudinary
vi.mock('next-cloudinary', () => ({
  CldImage: ({ src, alt, ...props }: { src: string; alt: string }) => {
    return `<img src="${src}" alt="${alt}" />`;
  },
}));
