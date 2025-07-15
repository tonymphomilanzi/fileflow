# FileFlow

Modern, sleek & private in-browser media converter powered by FFmpeg.

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?logo=vite)
![Zustand](https://img.shields.io/badge/Zustand-State--Management-6c47ff?logo=zustand)
![ffmpeg.wasm](https://img.shields.io/badge/FFmpeg-WASM-success?logo=ffmpeg)
![shadcn/ui](https://img.shields.io/badge/Shadcn-UI-lightgrey?logo=radixui)
![License](https://img.shields.io/github/license/yourusername/fileflow)

---

## What is FileFlow?

**FileFlow** is a free, beautiful, and privacy-focused online media converter that works entirely in your browser. No file uploads, no server processing — everything is converted locally using `ffmpeg`.

**Convert videos, audio, and images** to formats like:

- Video: `mp4`, `webm`, `gif`
- Audio: `mp3`, `wav`
- Image: `png`, `jpeg`, `webp`

---

##  Features

-  Drag & Drop or File Picker Upload
-  Choose output format & resolution
-  Bitrate + advanced options (when applicable)
-  Powered by `ffmpeg.wasm` — full conversion in browser
-  Real-time conversion progress with animations
-  Glassmorphism dark UI (Tailwind + shadcn)
-  Download after conversion with history via `localStorage`
-  Mobile-friendly & fully responsive
-  State management with `zustand`

---

## Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Frontend    | React 18 + Vite             |
| Styling     | Tailwind CSS + shadcn/ui    |
| Conversion  | `@ffmpeg/ffmpeg`            |
| State Mgmt  | Zustand                     |
| UI Motion   | Framer Motion               |
| Icons       | `lucide-react`              |
| Dialogs     | Radix UI via shadcn         |

---

## Installation

1. **Clone the repository**

git clone https://github.com/tonymphomilanzi/fileflow.git
cd fileflow
