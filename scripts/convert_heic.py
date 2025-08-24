import os
from PIL import Image
import pillow_heif

pillow_heif.register_heif_opener()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMG_DIR = os.path.join(BASE_DIR, "../img")


def convert_heic_to_jpg(folder):
    for root, _, files in os.walk(folder):
        for file in files:
            if file.lower().endswith(".heic"):
                heic_path = os.path.join(root, file)
                jpg_path = os.path.splitext(heic_path)[0] + ".jpg"

                try:
                    with Image.open(heic_path) as img:
                        img = img.convert("RGB")
                        img.save(jpg_path, "JPEG", quality=95)
                    os.remove(heic_path)
                    print(f"✅ Converted and removed: {heic_path} -> {jpg_path}")
                except Exception as e:
                    print(f"❌ Failed to convert {heic_path}: {e}")


if __name__ == "__main__":
    convert_heic_to_jpg(IMG_DIR)
