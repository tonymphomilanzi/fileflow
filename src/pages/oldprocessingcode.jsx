import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FFmpeg } from '@ffmpeg/ffmpeg'; 
import { fetchFile } from '@ffmpeg/util';
import { useUploadStore } from '../store/useUploadStore';
import { useConvertStore } from '../store/useConvertStore';
import { motion } from 'framer-motion';
import { Loader2, File as FileIcon, Image as ImageIcon, Music, Video } from 'lucide-react';
import { saveToHistory } from '../lib/history';

export default function Processing() {
  const uploadedFile = useUploadStore((s) => s.uploadedFile);
  const outputFormat = useConvertStore((s) => s.outputFormat);
  const conversionOptions = useConvertStore((s) => s.conversionOptions);
  const setProgress = useConvertStore((s) => s.setConversionProgress);
  const setConvertedFile = useConvertStore((s) => s.setConvertedFile);
  const navigate = useNavigate();

  const [status, setStatus] = useState('Initializing...');
  const [error, setError] = useState(null);

  const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm';

  const [ffmpeg] = useState(() => {
    const instance = new FFmpeg({ 
      log: true,
      coreURL: `${baseURL}/ffmpeg-core.js`,
      wasmURL: `${baseURL}/ffmpeg-core.wasm`,
      workerURL: `${baseURL}/ffmpeg-core.worker.js`,
    });

    instance.on('progress', ({ progress: ratio }) => {
      setProgress(Math.round(ratio * 100));
    });

    instance.on('log', ({ message }) => {
      console.log('[ffmpeg log]', message);
    });

    return instance;
  });

  useEffect(() => {
    const runConversion = async () => {
      if (!uploadedFile || !outputFormat) {
        navigate('/');
        return;
      }

      try {
        setStatus('Loading FFmpeg...');
        await ffmpeg.load(); 

        const inputName = uploadedFile.name;
        const outputName = `output.${outputFormat}`;

        setStatus('Writing file to memory...');
        await ffmpeg.writeFile(inputName, await fetchFile(uploadedFile));

        let args = ['-i', inputName];

        const isImageOutput = ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(outputFormat.toLowerCase());
        const isVideoInput = uploadedFile.type.startsWith('video/');
        const isAudioOrVideoInput = uploadedFile.type.startsWith('audio/') || uploadedFile.type.startsWith('video/');

        if (conversionOptions.resolution) {
          args.push('-vf', `scale=${conversionOptions.resolution}`);
        } else if (isVideoInput || isImageOutput) {
          args.push('-vf', `scale=1280x720`);
        }

        if (conversionOptions.bitrate && isAudioOrVideoInput) {
          args.push('-b:v', conversionOptions.bitrate);
        } else if (isAudioOrVideoInput) {
          args.push('-b:v', '2000k');
        }

        args.push(outputName);

        setStatus('Converting...');
        await ffmpeg.exec(args);

        setStatus('Fetching output...');
        const data = await ffmpeg.readFile(outputName);

        const blob = new Blob([data.buffer], { type: 'application/octet-stream' });
        const file = new File([blob], outputName, { type: blob.type });

        setConvertedFile(file);

        saveToHistory({
          name: file.name,
          size: file.size,
          format: outputFormat,
          date: new Date().toISOString(),
        });

        setStatus('Done! Redirecting...');
        setTimeout(() => navigate('/download'), 1200);
      } catch (err) {
        setError(err.message);
        setStatus('Conversion failed');
        console.error(err);
      }
    };

    runConversion();
  }, [uploadedFile, outputFormat, conversionOptions, ffmpeg, navigate, setConvertedFile, setProgress]);

  const progress = useConvertStore.getState().conversionProgress;

  // Select icon based on uploaded file type
  const getFileIcon = () => {
    if (!uploadedFile) return FileIcon;

    const type = uploadedFile.type;
    if (type.startsWith('image/')) return ImageIcon;
    if (type.startsWith('audio/')) return Music;
    if (type.startsWith('video/')) return Video;

    return FileIcon;
  };

  const FileTypeIcon = getFileIcon();

  const isProcessing =
    status.includes('Writing') ||
    status.includes('Converting') ||
    status.includes('Fetching');

  return (
    <div className="min-h-screen bg-black px-6 py-12 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full space-y-6 text-center glass p-8 rounded-3xl"
      >
        <Loader2 className="mx-auto animate-spin text-white" size={48} />
        <h1 className="text-2xl font-bold text-white">Processing</h1>
        <p className="text-white/70">{status}</p>

        {isProcessing && (
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex justify-center"
          >
            <FileTypeIcon className="text-white/80 w-12 h-12" />
          </motion.div>
        )}

        <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-blue-500 h-full"
          />
        </div>

        {error && <p className="text-red-400 mt-4">{error}</p>}
      </motion.div>
    </div>
  );
}
