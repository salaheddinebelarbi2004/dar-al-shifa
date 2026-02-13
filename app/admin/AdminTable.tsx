'use client';

import * as React from 'react';
import { FaIdCard, FaFileMedical, FaHospitalSymbol, FaUserInjured, FaNotesMedical } from 'react-icons/fa';
import { ImageDialogButton } from '@/components/ui/ImageDialogButton';

type Submission = {
  id: string;
  patient_name: string;
  age: number;
  tel: number;
  created_at: string;
  id_front_url: string;
  id_back_url: string;
  medical_doc_url: string;
  companion_name?: string | null;
  relation?: string | null;
};

export default function AdminTable({ submissions }: { submissions: Submission[] | null }) {
  if (!submissions?.length) {
    return (
      <div className="text-center py-20 text-slate-500">
        <FaHospitalSymbol className="mx-auto mb-4 text-5xl text-blue-600" />
        <p className="text-2xl font-semibold">لا توجد طلبات بعد.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-2 md:px-8 py-6" dir="rtl">
      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="py-4 px-6 text-right font-semibold text-lg">
                <span className="inline-flex items-center gap-2">
                  <FaUserInjured /> اسم المريض
                </span>
              </th>
              <th className="py-4 px-6 text-right font-semibold text-lg">
                <span className="inline-flex items-center gap-2">
                  <FaNotesMedical /> العمر
                </span>
              </th>
                <th className="py-4 px-6 text-right font-semibold text-lg">
                  <span className="inline-flex items-center gap-2">
                    <FaIdCard /> رقم الهاتف
                  </span>
                </th>
              <th className="py-4 px-6 text-right font-semibold text-lg">
                <span className="inline-flex items-center gap-2">
                  <FaHospitalSymbol /> تاريخ التقديم
                </span>
              </th>
              <th className="py-4 px-6 text-right font-semibold text-lg">
                <span className="inline-flex items-center gap-2">
                  <FaFileMedical /> الوثائق
                </span>
              </th>
              <th className="py-4 px-6 text-right font-semibold text-lg">
                <span className="inline-flex items-center gap-2">
                  <FaIdCard /> اسم المرافق
                </span>
              </th>
              <th className="py-4 px-6 text-right font-semibold text-lg">
                <span className="inline-flex items-center gap-2">
                  <FaIdCard /> علاقة المرافق
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr
                key={sub.id}
                className="border-b border-slate-200 hover:bg-blue-50 transition-colors group"
              >
                <td className="py-4 px-6 text-right font-medium text-slate-800">{sub.patient_name}</td>
                <td className="py-4 px-6 text-right text-slate-800">{sub.age}</td>
                <td className="py-4 px-6 text-right text-slate-800">{sub.tel}</td>
                <td className="py-4 px-6 text-right text-slate-800">
                  {new Date(sub.created_at).toLocaleString('ar-DZ', { dateStyle: 'medium', timeStyle: 'short' })}
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex gap-4 flex-wrap justify-end">
                    <ImageDialogButton url={sub.id_front_url} label="بطاقة أمام" icon={<FaIdCard />} />
                    <ImageDialogButton url={sub.id_back_url} label="بطاقة خلف" icon={<FaIdCard />} />
                    <ImageDialogButton url={sub.medical_doc_url} label="الوثيقة الطبية" icon={<FaFileMedical />} />
                  </div>
                </td>
                <td className="py-4 px-6 text-right text-slate-800">{sub.companion_name || '—'}</td>
                <td className="py-4 px-6 text-right text-slate-800">{sub.relation || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden flex flex-col gap-4">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 border border-blue-100"
          >
            <div className="flex items-center gap-2 text-blue-700 font-bold text-lg mb-1">
              <FaUserInjured /> {sub.patient_name}
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <FaNotesMedical /> العمر: <span className="font-medium">{sub.age}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <FaIdCard /> رقم الهاتف: <span className="font-medium">{sub.tel}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <FaHospitalSymbol /> التقديم:{" "}
              <span className="font-medium">
                {new Date(sub.created_at).toLocaleString('ar-DZ', { dateStyle: 'medium', timeStyle: 'short' })}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 justify-end mt-2">
              <ImageDialogButton url={sub.id_front_url} label="بطاقة أمام" icon={<FaIdCard />} />
              <ImageDialogButton url={sub.id_back_url} label="بطاقة خلف" icon={<FaIdCard />} />
              <ImageDialogButton url={sub.medical_doc_url} label="الوثيقة الطبية" icon={<FaFileMedical />} />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}