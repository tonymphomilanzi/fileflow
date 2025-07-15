import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Upload from './pages/Upload'
import Settings from './pages/Settings'
import Processing from './pages/Processing'
import Download from './pages/Download'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </Router>
  )
}
