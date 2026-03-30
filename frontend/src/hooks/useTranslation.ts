import { useState } from 'react';
import { type TranslationResponse, type ErrorResponse } from '../types';

export const useTranslation = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const translateFile = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file); //

    try {
      // เรียกไปยัง API Route ที่คุณตั้งไว้ใน Backend
      const response = await fetch('http://localhost:8000/api/v1/translate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ErrorResponse;
        throw new Error(errorData.detail || 'Precessing Error');
      }

      // อัปเดตข้อมูลจริงจาก API เข้าสู่ State
      setResult(data as TranslationResponse);
      
    } catch (err: any) {
      setError(err.message);
      console.error("Translation Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { translateFile, loading, result, error };
};