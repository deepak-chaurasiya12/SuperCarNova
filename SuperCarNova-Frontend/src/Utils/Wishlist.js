import { useEffect, useState } from "react";

const STORAGE_KEY = "wishlist";
const CHANGE_EVENT = "wishlist-changed";

/* ---------- Read / write ---------- */

export function getWishlist() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  // Tells every component on the page (Navbar, CarCard, Wishlist) to refresh
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/* ---------- Actions ---------- */

export function isInWishlist(id) {
  return getWishlist().some((item) => String(item.id) === String(id));
}

export function addToWishlist(car) {
  const id = car.id ?? car._id;
  const list = getWishlist();

  if (list.some((item) => String(item.id) === String(id))) return;

  saveWishlist([...list, { ...car, id }]);
}

export function removeFromWishlist(id) {
  saveWishlist(getWishlist().filter((item) => String(item.id) !== String(id)));
}

// Adds the car if it is not saved, removes it if it is.
// Returns true when the car is now in the wishlist.
export function toggleWishlist(car) {
  const id = car.id ?? car._id;

  if (isInWishlist(id)) {
    removeFromWishlist(id);
    return false;
  }

  addToWishlist(car);
  return true;
}

/* ---------- Hook ---------- */

// Returns the current wishlist and re-renders the component
// whenever it changes (in this tab or in another tab).
export function useWishlist() {
  const [wishlist, setWishlist] = useState(getWishlist);

  useEffect(() => {
    const refresh = () => setWishlist(getWishlist());

    window.addEventListener(CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(CHANGE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return wishlist;
}