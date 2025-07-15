import { create } from 'zustand'

export const useConvertStore = create((set) => ({
  outputFormat: '',
  conversionOptions: {
    resolution: '',
    bitrate: '',
  },
  conversionProgress: 0,
  convertedFile: null,

  setOutputFormat: (format) => set({ outputFormat: format }),
  setConversionOptions: (options) =>
    set((state) => ({
      conversionOptions: { ...state.conversionOptions, ...options },
    })),
  setConversionProgress: (progress) => set({ conversionProgress: progress }),
  setConvertedFile: (file) => set({ convertedFile: file }),
  clearConversionData: () =>
    set({
      outputFormat: '',
      conversionOptions: { resolution: '', bitrate: '' },
      conversionProgress: 0,
      convertedFile: null,
    }),
}))
