import { create } from 'zustand'

export const useUploadStore = create((set) => ({
  uploadedFile: null,
  setUploadedFile: (file) => set({ uploadedFile: file }),
  clearUploadedFile: () => set({ uploadedFile: null }),
}))
