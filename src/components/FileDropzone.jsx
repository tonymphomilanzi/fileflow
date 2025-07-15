import { useUploadStore } from '../store/useUploadStore'
import { useCallback } from 'react'
import {  Upload, FileUp, File } from 'lucide-react'

export default function FileDropzone() {
  const setUploadedFile = useUploadStore((state) => state.setUploadedFile)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) setUploadedFile(file)
  }, [setUploadedFile])

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) setUploadedFile(file)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-white/20 rounded-2xl p-10 text-center cursor-pointer hover:bg-white/5 transition flex flex-col items-center gap-3"
      onClick={() => document.getElementById('fileInput').click()}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && document.getElementById('fileInput').click()}
    >
      <FileUp className="w-12 h-12 text-white/70" />
      <p className="text-white/70 text-lg font-semibold ">Drag & Drop your media file here or click to upload</p>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept="video/*,audio/*,image/*"
      />
    </div>
  )
}
