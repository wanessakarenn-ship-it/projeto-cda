import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes CSS de forma inteligente,
 * resolvendo conflitos do Tailwind CSS.
 *
 * Exemplo:
 * cn('px-2 py-1', isActive && 'bg-indigo-500', 'px-4')
 * → 'py-1 px-4 bg-indigo-500'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
