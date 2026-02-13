"use client";

import Link from 'next/link';

export default function BackToHome() {
  return (
    <Link href="/" className="fixed top-4 left-4 z-50">
      <button className="bg-white/90 backdrop-blur-sm border border-slate-200 text-black text-sm px-3 py-1 rounded-md shadow hover:bg-white/95">
        عودة إلى الصفحة الرئيسية
      </button>
    </Link>
  );
}
