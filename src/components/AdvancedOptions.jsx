import { useConvertStore } from '../store/useConvertStore';
import { useUploadStore } from '../store/useUploadStore';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export default function AdvancedOptions() {
  const { conversionOptions, setConversionOptions } = useConvertStore();
  const uploadedFile = useUploadStore((s) => s.uploadedFile);

  const fileType = uploadedFile?.type || '';
  const isAudioOrVideo = fileType.startsWith('audio/') || fileType.startsWith('video/');
  const isImage = fileType.startsWith('image/');

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold text-white">Advanced Options</h2>
      <div className="space-y-4 max-w-md">

        <label className="block text-white/80">
          Resolution (e.g. 1280x720)
          <Input
            placeholder="1280x720"
            value={conversionOptions.resolution || ''}
            onChange={(e) =>
              setConversionOptions({ resolution: e.target.value })
            }
            className="mt-1"
          />
        </label>

        {isAudioOrVideo && (
          <label className="block text-white/80">
            Bitrate (e.g. 1200k)
            <Input
              placeholder="1200k"
              value={conversionOptions.bitrate || ''}
              onChange={(e) =>
                setConversionOptions({ bitrate: e.target.value })
              }
              className="mt-1"
            />
          </label>
        )}

        {isImage && (
          <label className="block text-white/80">
            Image Quality
            <Select
              onValueChange={(value) =>
                setConversionOptions({ imageQuality: value })
              }
              value={conversionOptions.imageQuality || ''}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </label>
        )}
      </div>
    </div>
  );
}
