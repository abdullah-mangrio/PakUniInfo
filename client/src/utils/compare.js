// client/src/utils/compare.js

const STORAGE_KEY = "pakuniinfo_compare";

function readCompare() {
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

function writeCompare(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function getCompareList() {
  return readCompare();
}

export function isInCompareList(id) {
  const list = readCompare();
  return list.some((u) => u._id === id);
}

export function addToCompare(university) {
  const list = readCompare();
  if (!university || !university._id) return list;

  const exists = list.some((u) => u._id === university._id);
  if (exists) return list;

  const limited = list.slice(0, 3); // just in case
  if (limited.length >= 3) return limited;

  const safeUni = {
    _id: university._id,
    name: university.name,
    location: university.location,
    city: university.city,
    province: university.province,
    ranking: university.ranking,
    programs: university.programs,
    website: university.website,
  };

  const updated = [...limited, safeUni];
  writeCompare(updated);
  return updated;
}

export function removeFromCompare(id) {
  const list = readCompare();
  const updated = list.filter((u) => u._id !== id);
  writeCompare(updated);
  return updated;
}

export function clearCompare() {
  writeCompare([]);
  return [];
}
