import { useConvertStore } from '../store/useConvertStore'
import { useUploadStore } from '../store/useUploadStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Download, RotateCw } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function DownloadPage() {
  const convertedFile = useConvertStore((s) => s.convertedFile)
  const clearFile = useUploadStore((s) => s.clearUploadedFile)
  const clearConvert = useConvertStore((s) => s.clearConversionData)
  const navigate = useNavigate()

  useEffect(() => {
    if (!convertedFile) {
      navigate('/')
      return
    }

    // Trigger confetti once when the file is available
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      scalar: 1.2,
    })
  }, [convertedFile, navigate])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(convertedFile)
    link.download = convertedFile.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resetApp = () => {
    clearFile()
    clearConvert()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-black px-6 py-12 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8 text-center glass p-8 rounded-3xl">
        <h1 className="text-3xl font-bold text-white">🎉 Conversion Complete!</h1>

        <div className="bg-white/5 p-6 rounded-2xl text-left text-white/80">
          <p><strong>File:</strong> {convertedFile?.name}</p>
          <p><strong>Size:</strong> {(convertedFile?.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>

        <button
          onClick={handleDownload}
          className="w-full max-w-md mx-auto mt-6 flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-900  hover:bg-blue-700 text-white py-3 rounded-2xl transition"
        >
          <Download className="w-6 h-6" /> Download File
        </button>

        <button
          onClick={resetApp}
          className="w-full border border-white/20 hover:bg-white/10 py-3 rounded-2xl flex justify-center items-center gap-2 text-white text-lg transition"
        >
          <RotateCw className="w-6 h-6" /> Convert Another File
        </button>
      </div>
    </div>
  )
}
