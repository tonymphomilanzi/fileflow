import { useConvertStore } from '../store/useConvertStore'
import { useUploadStore } from '../store/useUploadStore'
import { Button } from '@/components/ui/button'

// Define format groups
const audioVideoFormats = ['mp4', 'mp3', 'webm']
const imageFormats = ['png', 'jpeg', 'jpg', 'gif', 'webp']

export default function FormatSelector() {
  const outputFormat = useConvertStore((s) => s.outputFormat)
  const setOutputFormat = useConvertStore((s) => s.setOutputFormat)
  const uploadedFile = useUploadStore((s) => s.uploadedFile)

  // Determine file type
  const fileType = uploadedFile?.type || ''
  const isImage = fileType.startsWith('image/')
  const isAudioOrVideo = fileType.startsWith('audio/') || fileType.startsWith('video/')

  // Pick formats based on file type
  const formatsToShow = isImage
    ? imageFormats
    : isAudioOrVideo
    ? audioVideoFormats
    : []

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-white">Select Output Format</h2>
      <div className="flex gap-3 flex-wrap">
        {formatsToShow.length > 0 ? (
          formatsToShow.map((fmt) => (
            <Button
              key={fmt}
              variant={outputFormat === fmt ? 'default' : 'outline'}
              onClick={() => setOutputFormat(fmt)}
            >
              {fmt.toUpperCase()}
            </Button>
          ))
        ) : (
          <p className="text-white/60 italic">Please upload a supported file.</p>
        )}
      </div>
    </div>
  )
}
