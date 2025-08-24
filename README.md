# HVL Champions Club Website
## Setup Instructions
### Pre-Requisites
- Python 3.8+

<br>

### 1. Clone Repository
```bash
git clone https://github.com/hvlchampionsclub/hvlchampionsclub.github.io.git
cd hvlchampionsclub.github.io
```

### 2. Create Virtual Environment
```bash
python3 -m venv venv
```

### 3. Activate Virtual Environment
- **Mac/Linux**:
  ```bash
  source venv/bin/activate
  ```
- **Windows (Command Prompt)**:
  ```cmd
  venv\Scripts\activate
  ```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

<br>

---

## Update Images
### 1. Image Conversion (HEIC → JPG)
Some images (from iPhones/iPads) may be in `.heic` format, which is **not supported** by GitHub Pages.
Use the provided script to convert them automatically:
```bash
python scripts/convert_heic.py
```

This will:
- Scan the `img/` folder recursively.
- Convert all `.heic` files to `.jpg`.
- Save converted images in the same folder.

### 2. Update Gallery
To regenerate the student awards gallery in `index.html` and the full gallery in `components/gallery.html`, run:
```bash
python scripts/update_images.py
```

<br>

---

## 📂 Project Structure
```
hvlchampionsclub.github.io/
│── index.html
│── components/
│   └── gallery.html
│── img/
│   ├── practice/
│   ├── student-awards/
│   │   ├── junior-awards/
│   │   └── senior-awards/
│   ├── student-groups/
│   └── trainers/
│── scripts/
│   ├── gather_images.py
│   └── convert_heic.py
│── requirements.txt
│── README.md
```

---