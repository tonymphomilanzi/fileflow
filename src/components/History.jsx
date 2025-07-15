import { useState, useEffect } from 'react';
import { getHistory, deleteFromHistory, clearAllHistory } from '../lib/history';
import { List, X, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'; // Import AlertDialog components

export default function History() {
  const [history, setHistory] = useState([]);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false); // State for AlertDialog visibility

  const loadHistory = () => {
    setHistory(getHistory());
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = (itemName) => {
    deleteFromHistory(itemName);
    loadHistory();
  };

  const handleClearAll = () => {
    clearAllHistory();
    loadHistory();
    setShowClearAllConfirm(false); // Close the dialog after clearing
  };

  if (!history.length) return null;

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow p-6 max-w-md mx-auto mt-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-white/70  font-semibold">
          <List className="w-5 h-5" />
          Recent Conversions
        </h3>
        {/* Clear All History Button (top right) using AlertDialogTrigger */}
        <AlertDialog open={showClearAllConfirm} onOpenChange={setShowClearAllConfirm}>
          <AlertDialogTrigger asChild>
            <button
              className="text-white/50 hover:text-red-400 transition-colors duration-200 p-1 rounded-full"
              aria-label="Clear all history"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-gray-800 text-white border-gray-700 rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                This action cannot be undone. This will permanently delete your
                conversion history from this browser.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600 border-none">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleClearAll} 
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Clear History
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <ul className="space-y-2 text-white/70 text-sm">
        {history.map((item, i) => (
          <li key={item.name || i} className="flex items-center justify-between border-b border-white/10 pb-1 last:border-none">
            <div>
              <span className="font-medium">{item.name}</span> →{' '}
              <span className="text-white">{item.format.toUpperCase()}</span>{' '}
              <span className="text-white/50">· {new Date(item.date).toLocaleString()}</span>
            </div>
            {/* Individual Delete Button (X icon) */}
            <button
              onClick={() => handleDelete(item.name)}
              className="text-white/50 hover:text-red-400 transition-colors duration-200 p-1 rounded-full"
              aria-label={`Delete ${item.name}`}
            >
              <X className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
