import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(BASE_DIR, "img")
GALLERY_FILE = os.path.join(BASE_DIR, "components/gallery.html")
INDEX_FILE = os.path.join(BASE_DIR, "index.html")

EXCLUDE_FILES = {"favicon.jpg", "favicon.png", "favicon.ico"}


def update_gallery_html():
    """Update gallery.html with all images in img/ excluding favicons."""
    all_images = []
    for root, dirs, files in os.walk(IMG_DIR):
        for file in files:
            if file.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".webp")):
                if file.lower() in EXCLUDE_FILES:
                    continue
                rel_path = os.path.relpath(os.path.join(root, file), BASE_DIR).replace(
                    "\\", "/"
                )
                rel_path = os.path.join("..", rel_path).replace("\\", "/")
                all_images.append(rel_path)

    all_images.sort()
    img_tags = "\n\t\t\t".join(
        [f'<img src="{src}" alt="student">' for src in all_images]
    )
    new_gallery = f'<div class="all-images-gallery">\n\t\t\t{img_tags}\n\t\t</div>'

    with open(GALLERY_FILE, "r", encoding="utf-8") as f:
        html_content = f.read()

    updated_content = re.sub(
        r'<div class="all-images-gallery">.*?</div>',
        new_gallery,
        html_content,
        flags=re.DOTALL,
    )

    with open(GALLERY_FILE, "w", encoding="utf-8") as f:
        f.write(updated_content)

    print(
        f"✅ Updated {GALLERY_FILE} with {len(all_images)} images (favicons excluded)."
    )


def update_index_html():
    """Update index.html student awards section with latest junior & senior images."""
    STUDENT_AWARDS_DIR = os.path.join(IMG_DIR, "student-awards")
    JUNIOR_DIR = os.path.join(STUDENT_AWARDS_DIR, "junior-awards")
    SENIOR_DIR = os.path.join(STUDENT_AWARDS_DIR, "senior-awards")

    def get_images(folder, rel_prefix="img/student-awards"):
        """Return sorted list of <img> tags for images in a folder"""
        if not os.path.exists(folder):
            return []
        imgs = []
        for f in sorted(os.listdir(folder)):
            if f.lower().endswith((".jpg", ".jpeg", ".png", ".gif", ".webp")):
                rel_path = f"{rel_prefix}/{os.path.basename(folder)}/{f}"
                imgs.append(f'<img src="{rel_path}" alt="student" class="hover-zoom">')
        return imgs

    junior_imgs = "\n\t\t\t\t".join(get_images(JUNIOR_DIR))
    senior_imgs = "\n\t\t\t\t".join(get_images(SENIOR_DIR))

    new_section = f"""
<section id="students-awards" class="students-awards fade-in">
\t\t<div class="container">
\t\t\t<h2 class="underline">Our Student Achievers</h2>
\t\t\t<h3>Junior Awards</h3>
\t\t\t<div class="awards-gallery">
\t\t\t\t{junior_imgs}
\t\t\t</div>
\t\t\t<br><br>
\t\t\t<h3>Senior Awards</h3>
\t\t\t<div class="awards-gallery">
\t\t\t\t{senior_imgs}
\t\t\t</div>
\t\t\t<a href="components/gallery.html" class="button pulse" target="_blank">View Our Gallery</a>
\t\t</div>
\t</section>
"""

    with open(INDEX_FILE, "r", encoding="utf-8") as f:
        html = f.read()

    updated_html = re.sub(
        r'<section id="students-awards".*?</section>',
        new_section,
        html,
        flags=re.DOTALL,
    )

    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        f.write(updated_html)

    print("✅ index.html updated with latest junior & senior award images.")


if __name__ == "__main__":
    update_gallery_html()
    update_index_html()
