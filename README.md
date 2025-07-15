# 🚀 FileFlow

![HEADER](https://github.com/user-attachments/assets/fdb09b27-7015-4a32-a9cc-7ca8cac00841)

Modern, sleek & private in-browser media converter powered by FFmpeg.

<div align="center">
  
![React](https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)
![Vite](https://img.shields.io/badge/-Vite-1a1a1a?style=for-the-badge&logo=vite&logoColor=646CFF)
![Zustand](https://img.shields.io/badge/-Zustand-161b22?style=for-the-badge&logo=react&logoColor=white)
![FFmpeg](https://img.shields.io/badge/-FFmpeg%20WASM-0b1e2d?style=for-the-badge&logo=ffmpeg&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/-shadcn%2Fui-18181b?style=for-the-badge&logo=radixui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/-Framer--Motion-000?style=for-the-badge&logo=framer&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/-Lucide--React-111827?style=for-the-badge&logo=react&logoColor=white)

</div>

---

## 📦 What is FileFlow?

**FileFlow** is a free, beautiful, and privacy-focused online media converter that works entirely in your browser. No file uploads, no server processing — everything is converted locally using `ffmpeg`.

**Convert videos, audio, and images** to formats like:

- 🎞️ Video: `mp4`, `webm`, `gif`
- 🎧 Audio: `mp3`, `wav`
- 🖼️ Image: `png`, `jpeg`, `webp`

---

## ✨ Features

- ✅ Drag & Drop or File Picker Upload
- 🎚️ Choose output format & resolution
- 🔧 Bitrate + advanced options (when applicable)
- ⚙️ Powered by `ffmpeg.wasm` — full conversion in browser
- 🔄 Real-time conversion progress with animations
- 🧊 Glassmorphism dark UI (Tailwind + shadcn)
- 📥 Download after conversion with history via `localStorage`
- 📱 Mobile-friendly & fully responsive
- 🧠 State management with `zustand`

---

## 🛠 Tech Stack

| Layer        | Technology                  |
|--------------|------------------------------|
| Frontend     | React + Vite                 |
| Styling      | Tailwind CSS + shadcn/ui     |
| Conversion   | `@ffmpeg/ffmpeg` (WASM)      |
| State Mgmt   | Zustand                      |
| UI Motion    | Framer Motion                |
| Icons        | `lucide-react`               |
| Dialogs/UX   | Radix UI via shadcn/ui       |

---

## 🚀 Installation

# 1. Clone the repository
git clone https://github.com/tonymphomilanzi/fileflow.git
cd fileflow

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

**Author**
Tony Milanzi
Developer & Maker
   Malawi

**License**
FileFlow uses FFmpeg under the LGPL v2.1 license.
FFmpeg is a trademark of Fabrice Bellard and is licensed under LGPL v2.1.
This project does not modify FFmpeg itself and complies with the terms of the license.


