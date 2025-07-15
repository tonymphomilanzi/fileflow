import { useNavigate } from 'react-router-dom'
import { useUploadStore } from '../store/useUploadStore'
import { useConvertStore } from '../store/useConvertStore'
import FormatSelector from '../components/FormatSelector'
import AdvancedOptions from '../components/AdvancedOptions'
import { Button } from '@/components/ui/button'
import { Settings as SettingsIcon } from 'lucide-react'
import { useEffect } from 'react'

export default function Settings() {
  const uploadedFile = useUploadStore((s) => s.uploadedFile)
  const outputFormat = useConvertStore((s) => s.outputFormat)
  const navigate = useNavigate()

  useEffect(() => {
    if (!uploadedFile) navigate('/')
  }, [uploadedFile, navigate])

  const handleConvert = () => {
    navigate('/processing')
  }

  return (
    <div className="min-h-screen bg-black px-6 py-12 flex flex-col items-center">
      <div className="max-w-xl w-full space-y-8 glass p-8 rounded-3xl">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3 font-sora">
          <SettingsIcon className="w-8 h-8" /> Conversion Settings
        </h1>

        <FormatSelector />
        <AdvancedOptions />

        <Button
          disabled={!outputFormat}
          onClick={handleConvert}
         
           className="w-full max-w-md mx-auto mr-16 mt-6 flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-900  hover:bg-blue-700 text-white py"
        >
          Convert Now
        </Button>
      </div>
    </div>
  )
}
