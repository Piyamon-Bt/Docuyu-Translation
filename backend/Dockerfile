# backend/Dockerfile
FROM python:3.11-slim

# 1. ติดตั้ง System Dependencies (คงเดิมตามที่คุณมี)
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    tesseract-ocr \
    tesseract-ocr-chi-sim \
    tesseract-ocr-eng \
    libmagic1 \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 2. Copy requirements.txt จากโฟลเดอร์ปัจจุบัน (ซึ่งคือ backend/)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 3. Copy โค้ดทั้งหมดในโฟลเดอร์ backend เข้าไปใน /app ใน Container
COPY . .

# 4. รันแอป (คงเดิม)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]