const HISTORY_KEY = 'mediaforge-history';

/**
 * Saves file conversion information to local storage history.
 * Keeps a maximum of 10 unique items, removing duplicates.
 * @param {object} fileInfo - Object containing file name, format, and date.
 */
export function saveToHistory(fileInfo) {
  const current = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  // Filter out the item if it already exists to avoid duplicates, then add the new one at the beginning.
  // Slice to ensure a maximum of 10 items are kept.
  const updated = [fileInfo, ...current.filter(f => f.name !== fileInfo.name).slice(0, 9)];
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

/**
 * Retrieves the conversion history from local storage.
 * @returns {Array} An array of historical conversion items.
 */
export function getHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
}

/**
 * Deletes a specific item from the conversion history by its name.
 * @param {string} itemName - The name of the item to delete from history.
 */
export function deleteFromHistory(itemName) {
  const current = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  // Filter out the item that matches the given name
  const updated = current.filter(item => item.name !== itemName);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

/**
 * Clears all items from the conversion history in local storage.
 */
export function clearAllHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
