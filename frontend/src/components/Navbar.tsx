import React, { useState, useEffect } from 'react';
import logoImg from '../assets/Docuyu.png';

export const Navbar: React.FC = () => {
  // สร้าง State เพื่อเก็บว่า Section ไหนกำลัง Active อยู่
  const [activeSection, setActiveSection] = useState<string>('');

  const navItems = [
    { label: 'Document Type', href: '#classification', id: 'classification' },
    { label: 'Translate', href: '#translation', id: 'translation' },
    { label: 'Pinyin', href: '#pinyin', id: 'pinyin' },
    { label: 'Summary', href: '#summary', id: 'summary' },
  ];

  useEffect(() => {
    // ฟังก์ชันสำหรับตรวจจับการเลื่อนหน้าจอ
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // ปรับค่าเพื่อให้เปลี่ยนสีเมื่อเข้าใกล้กึ่งกลางหน้าจอ
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // เริ่มสังเกตการณ์ทุก Section ที่ระบุไว้ใน navItems
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-[#F7F4EF] backdrop-blur-md border-b border-slate-100 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <img 
            src={logoImg} 
            alt="Agentic AI Translation Logo" 
            className="h-12 w-auto object-contain transition-opacity group-hover:opacity-80" 
          />
        </a>

        <div className="hidden md:flex gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'text-[#FF7853] scale-105' // สีเมื่ออยู่หน้าตัวเอง (Active)
                    : 'text-slate-500 hover:text-[#FF7853]' // สีปกติ
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="md:hidden">
          <button 
            className="text-slate-500 hover:text-[#FF7853] transition-colors"
            aria-label="เปิดเมนูนำทาง"
            title="เปิดเมนู"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};