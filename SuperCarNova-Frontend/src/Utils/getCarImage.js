// Loads every image inside src/assets/Images/ once, when the app starts.
// Vite replaces each file with its final (hashed) URL.
const images = import.meta.glob("../assets/Images/*.{jpg,jpeg,png,webp,avif,svg}", {
  eager: true,
  import: "default"
});

/*
  getCarImage("car1.jpg")            -> URL of src/assets/Images/car1.jpg
  getCarImage("https://site/x.jpg")  -> returned unchanged (full URLs also work)
  getCarImage("missing.jpg")         -> "" (nothing found)
*/
export function getCarImage(fileName) {
  if (!fileName) return "";

  // Full web URLs (Cloudinary, etc.) are used as they are
  if (/^(https?:)?\/\//.test(fileName)) return fileName;

  const match = Object.keys(images).find((path) => path.endsWith(`/${fileName}`));

  if (!match && import.meta.env.DEV) {
    console.warn(`getCarImage: "${fileName}" was not found in src/assets/Images/`);
  }

  return match ? images[match] : "";
}