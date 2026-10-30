
// Load all images from src/assets/Images/
const images = import.meta.glob(
  "../assets/Images/*.{jpg,jpeg,png,webp,avif,svg,JPG,JPEG,PNG,WEBP,AVIF}",
  {
    eager: true,
    import: "default",
  }
);

export function getCarImage(fileName) {
  if (!fileName) return "";

  // Support full image URLs
  if (/^(https?:)?\/\//i.test(fileName)) {
    return fileName;
  }

  // Get filename and match without case sensitivity
  const requestedName = fileName.split("/").pop().toLowerCase();

  const match = Object.keys(images).find((path) => {
    const actualName = path.split("/").pop().toLowerCase();
    return actualName === requestedName;
  });

  if (!match) {
    console.warn(`Image "${fileName}" not found in src/assets/Images/`);
    return "";
  }

  return images[match];
}
