/**
 * @file utils.ts
 * @description General utility functions for the application.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes intelligently.
 * Uses 'clsx' for conditional classes and 'tailwind-merge' to handle conflicts.
 * 
 * @param {...ClassValue[]} inputs - List of class names or conditional class objects.
 * @returns {string} The merged class name string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
