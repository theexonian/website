import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Keeps a redirect target same-origin. Clerk resolves return URLs with
 * `new URL(target, baseUrl)`, so "//evil.com" would escape to another host.
 */
export function safeRedirectPath(path?: string | null) {
  if (!path || !path.startsWith("/")) return "/"
  if (path.startsWith("//") || path.startsWith("/\\")) return "/"
  return path
}
