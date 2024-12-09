import { create } from 'zustand'

interface PosterStore {
  markdown: string
  gradient: string
  font: string
  scale: number
  setMarkdown: (md: string) => void
  // ...其他状态和方法
}

export const usePosterStore = create<PosterStore>((set) => ({
  markdown: '',
  gradient: 'from-violet-500 to-blue-500',
  font: 'Inter',
  scale: 1,
  setMarkdown: (md) => set({ markdown: md })
})) 