'use client';

import Link from 'next/link';
import { FaFileMedical, FaInfoCircle, FaHospitalSymbol, FaUserMd } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Background image + blur overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/img/image1.webp')" }} />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Content card */}
      <div className="relative z-10 w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <div className="flex flex-col items-center gap-3">
          <FaHospitalSymbol className="text-5xl text-blue-700" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">دار الشفاء</h1>
          <p className="text-slate-700">نظام تقديم طلبات الإقامة</p>
        </div>

        <div className="mt-8 grid gap-4">
          <Link
            href="/form"
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-green-600 text-white text-lg font-semibold shadow hover:translate-y-[-4px] transition-transform"
          >
            <FaFileMedical className="text-xl" /> النموذج العام
          </Link>

        
          <Link
            href="/admin"
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-gray-800 text-white text-lg font-semibold shadow hover:translate-y-[-4px] transition-transform"
          >
            <FaUserMd className="text-xl" /> لوحة التحكم (خاصة بالموظفين)
          </Link>
        </div>

        <div className="mt-6 text-sm text-slate-600">للمساعدة اتصل بنا أو راجع الوثائق</div>
      </div>
    </div>
  );
}