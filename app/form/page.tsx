export const dynamic = 'force-dynamic'
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import BackToHome from '@/components/back-to-home';
import { FaUserInjured, FaUserMd, FaIdCard, FaFileMedical, FaHeartbeat, FaHospitalSymbol, FaCheckCircle, FaFilePdf } from 'react-icons/fa';
import { useRef } from "react";
export default function Form() {
  const supabase = createClient();
  const [age, setAge] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [idFrontFile, setIdFrontFile] = useState<File | null>(null);
  const [idBackFile, setIdBackFile] = useState<File | null>(null);
  const [medicalFile, setMedicalFile] = useState<File | null>(null);
  const [idFrontPreview, setIdFrontPreview] = useState<string | null>(null);
  const [idBackPreview, setIdBackPreview] = useState<string | null>(null);
  const [medicalPreview, setMedicalPreview] = useState<string | null>(null);


    const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const patient_name = formData.get('patient_name') as string;
    const ageNum = Number(formData.get('age'));
    const tel = Number(formData.get('tel'));
    const companion_name = formData.get('companion_name') as string | null;
    const relation = formData.get('relation') as string | null;

    const id_front = formData.get('id_front') as File;
    const id_back = formData.get('id_back') as File;
    const medical_doc = formData.get('medical_doc') as File;

    // Upload images
    const uploadFile = async (file: File, folder: string) => {
      
      const fileExt = file.name.split('.').pop();
      const randomPart = Math.random().toString(36).substring(2, 10);  // cleaner, no '0.'
      const fileName = `${Date.now()}-${randomPart}.${fileExt || 'jpg'}`;  // fallback ext
  
      const path = `${folder}/${fileName}`;

      const { data, error } = await supabase.storage
        .from('documents')
        .upload(path, file, { upsert: false });

      if (error){
         console.error('Full upload error:', error);
       throw error;

      }
      return supabase.storage.from('documents').getPublicUrl(path).data.publicUrl;
       
      
    };

    try {
      const [id_front_url, id_back_url, medical_doc_url] = await Promise.all([
        uploadFile(id_front, 'ids'),
        uploadFile(id_back, 'ids'),
        uploadFile(medical_doc, 'medical'),
      ]);

      const { error } = await supabase.from('submissions').insert({
        patient_name,
        age: ageNum,
        tel,
        companion_name: ageNum < 17 ? companion_name : null,
        relation: ageNum < 17 ? relation : null,
        id_front_url,
        id_back_url,
        medical_doc_url,
      });

      if (error) throw error;
      setSuccess(true);
      // reset form UI
      setIdFrontFile(null);
      setIdBackFile(null);
      setMedicalFile(null);
      setIdFrontPreview(null);
      setIdBackPreview(null);
      setMedicalPreview(null);
      setAge('');
      form.reset();
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Create previews for selected files (client-side only)
  useEffect(() => {
    if (idFrontFile) {
      const url = URL.createObjectURL(idFrontFile);
      setIdFrontPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setIdFrontPreview(null);
    return;
  }, [idFrontFile]);

  useEffect(() => {
    if (idBackFile) {
      const url = URL.createObjectURL(idBackFile);
      setIdBackPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setIdBackPreview(null);
    return;
  }, [idBackFile]);

  useEffect(() => {
    if (medicalFile) {
      const url = URL.createObjectURL(medicalFile);
      setMedicalPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setMedicalPreview(null);
    return;
  }, [medicalFile]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white py-8 px-2">
      <BackToHome />
      {/* Back to home button */}
      <>
        {/* import placed inline to keep patch minimal */}
      </>
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-blue-100">
        <div className="flex flex-col items-center mb-6">
          <FaHospitalSymbol className="text-4xl text-blue-700 mb-2" />
          <h1 className="text-2xl font-bold text-blue-800 mb-1 flex items-center gap-2">
            <FaHeartbeat className="text-pink-500" /> استمارة معلومات المريض
          </h1>
          <span className="text-blue-600 font-semibold">دار الشفاء</span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" autoComplete="off">
          {/* Patient name */}
          <label className="flex items-center gap-2 font-medium text-slate-700">
            <FaUserInjured className="text-blue-600" />
            اسم المريض
          </label>
          <input
            name="patient_name"
            placeholder="أدخل اسم المريض"
            required
            className="input input-bordered w-full rounded-lg px-4 py-2 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />

          {/* Age */}
          <label className="flex items-center gap-2 font-medium text-slate-700">
            <FaUserMd className="text-blue-600" />
            العمر
          </label>
          <input
            type="number"
            name="age"
            placeholder="أدخل عمر المريض"
            required
            min="1"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="input input-bordered w-full rounded-lg px-4 py-2 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
           {/* Telephone number */}
          <label className="flex items-center gap-2 font-medium text-slate-700">
            <FaIdCard className="text-blue-600" />
            رقم الهاتف
          </label>
          <input
            type="tel"
            name="tel"
            placeholder="أدخل رقم الهاتف"
            required
            className="input input-bordered w-full rounded-lg px-4 py-2 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />

          {/* Companion fields – shown only if age < 17 */}
          {age !== '' && Number(age) < 17 && (
            <>
              <label className="flex items-center gap-2 font-medium text-slate-700">
                <FaUserMd className="text-green-600" />
                اسم المرافق
              </label>
              <input
                name="companion_name"
                placeholder="أدخل اسم المرافق"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
              />
              <label className="flex items-center gap-2 font-medium text-slate-700">
                <FaUserMd className="text-green-600" />
                علاقة المرافق بالمريض
              </label>
              <input
                name="relation"
                placeholder="مثال: أب، أم، أخ"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
              />
            </>
          )}

          {/* Images */}
          <label className="flex items-center gap-2 font-medium text-slate-700">
            <FaIdCard className="text-blue-600" />
            صورة الهوية الأمامية
          </label>
          <input
            type="file"
            name="id_front"
            accept="image/*"
            required
            onChange={(e) => setIdFrontFile(e.target.files?.[0] ?? null)}
            className="file-input file-input-bordered w-full"
          />
          <div className="flex items-center gap-3 mt-2">
            {idFrontPreview ? (
              <div className="relative">
                <img src={idFrontPreview} alt="id front preview" className="w-28 h-20 object-cover rounded-md border" />
                <FaCheckCircle className="text-green-500 absolute -top-2 -right-2 bg-white rounded-full" />
              </div>
            ) : (
              <div className="w-28 h-20 flex items-center justify-center rounded-md border border-dashed text-slate-400">
                <span>لم يتم اختيار صورة</span>
              </div>
            )}
            {idFrontFile && <div className="text-sm text-slate-600">{idFrontFile.name}</div>}
          </div>

          <label className="flex items-center gap-2 font-medium text-slate-700">
            <FaIdCard className="text-blue-600" />
            صورة الهوية الخلفية
          </label>
          <input
            type="file"
            name="id_back"
            accept="image/*"
            required
            onChange={(e) => setIdBackFile(e.target.files?.[0] ?? null)}
            className="file-input file-input-bordered w-full"
          />
          <div className="flex items-center gap-3 mt-2">
            {idBackPreview ? (
              <div className="relative">
                <img src={idBackPreview} alt="id back preview" className="w-28 h-20 object-cover rounded-md border" />
                <FaCheckCircle className="text-green-500 absolute -top-2 -right-2 bg-white rounded-full" />
              </div>
            ) : (
              <div className="w-28 h-20 flex items-center justify-center rounded-md border border-dashed text-slate-400">
                <span>لم يتم اختيار صورة</span>
              </div>
            )}
            {idBackFile && <div className="text-sm text-slate-600">{idBackFile.name}</div>}
          </div>

          <label className="flex items-center gap-2 font-medium text-slate-700">
            <FaFileMedical className="text-green-600" />
            الوثيقة الطبية
          </label>
          <input
            type="file"
            name="medical_doc"
            accept="image/*,application/pdf"
            required
            onChange={(e) => setMedicalFile(e.target.files?.[0] ?? null)}
            className="file-input file-input-bordered w-full"
          />
          <div className="flex items-center gap-3 mt-2">
            {medicalPreview ? (
              <div className="relative">
                <img src={medicalPreview} alt="medical preview" className="w-28 h-20 object-contain rounded-md border" />
                <FaCheckCircle className="text-green-500 absolute -top-2 -right-2 bg-white rounded-full" />
              </div>
            ) : medicalFile && medicalFile.type === 'application/pdf' ? (
              <div className="flex items-center gap-2">
                <FaFilePdf className="text-red-500 text-2xl" />
                <div className="text-sm text-slate-600">{medicalFile.name}</div>
              </div>
            ) : (
              <div className="w-28 h-20 flex items-center justify-center rounded-md border border-dashed text-slate-400">
                <span>لم يتم اختيار ملف</span>
              </div>
            )}
            {medicalFile && medicalFile.type !== 'application/pdf' && <div className="text-sm text-slate-600">{medicalFile.name}</div>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                جاري الإرسال...
              </>
            ) : (
              <>
                <FaHeartbeat /> إرسال
              </>
            )}
          </button>

          {success && <p className="text-green-600 text-center font-semibold mt-2">تم الإرسال بنجاح!</p>}
        </form>
        <div className="mt-8 text-center opacity-80">
          <a
            href="/admin"
            className="text-blue-700 hover:underline text-sm flex items-center justify-center gap-1"
          >
            <FaHospitalSymbol /> لوحة التحكم الإدارية (للموظفين فقط)
          </a>
        </div>
      </div>
    </div>
  );
}

