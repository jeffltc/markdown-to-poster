import { usePosterStore } from './store'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { debounce } from 'lodash'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debouncedUpdate = debounce((value: string) => {
  usePosterStore.getState().setMarkdown(value)
}, 300) 