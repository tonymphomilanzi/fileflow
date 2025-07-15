import FileDropzone from '../components/FileDropzone'
import { useUploadStore } from '../store/useUploadStore'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import History from '../components/History'

export default function Upload() {
  const uploadedFile = useUploadStore((state) => state.uploadedFile)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen  bg-black px-6 py-12 flex flex-col items-center">
      <div className="max-w-xl w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-3 bg-gradient-to-r from-black via-gray-400 to-white text-transparent bg-clip-text font-sora">
          FileFlow
        </h1>
        <p className="text-white/70 text-center mb-8 font-sora"> Free online media converter. Fast, free, and fluid media transformations.</p>

        <FileDropzone />

        {uploadedFile && (
          <div className="glass mt-4 p-4 rounded-2xl max-w-md mx-auto">
            <p className="text-white/80 text-sm"><strong>File:</strong> {uploadedFile.name}</p>
            <p className="text-white/80 text-sm">
              <strong>Size:</strong> {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        {uploadedFile && (
          <button
            onClick={() => navigate('/settings')}
            className="w-full max-w-md mx-auto mt-6 flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-900  hover:bg-blue-700 text-white py-3 rounded-2xl transition"
          >
            Next: Select Format <ArrowRight className="w-5 h-5" />
          </button>
        )}

        <History />
      </div>
    </div>
  )
}
