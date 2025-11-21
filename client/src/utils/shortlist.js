// client/src/utils/shortlist.js

const STORAGE_KEY = "pakuniinfo_shortlist";

function readShortlist() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function writeShortlist(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function getShortlist() {
  return readShortlist();
}

export function isInShortlist(id) {
  const list = readShortlist();
  return list.some((u) => u._id === id);
}

export function addToShortlist(university) {
  const list = readShortlist();
  if (!university || !university._id) return list;

  const exists = list.some((u) => u._id === university._id);
  if (exists) return list;

  const updated = [...list, university];
  writeShortlist(updated);
  return updated;
}

export function removeFromShortlist(id) {
  const list = readShortlist();
  const updated = list.filter((u) => u._id !== id);
  writeShortlist(updated);
  return updated;
}
