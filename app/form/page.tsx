'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Form() {
  const supabase = createClient();
  const [age, setAge] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const patient_name = formData.get('patient_name') as string;
    const ageNum = Number(formData.get('age'));
    const companion_name = formData.get('companion_name') as string | null;
    const relation = formData.get('relation') as string | null;

    const id_front = formData.get('id_front') as File;
    const id_back = formData.get('id_back') as File;
    const medical_doc = formData.get('medical_doc') as File;

    // Upload images
    const uploadFile = async (file: File, folder: string) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36)}.${fileExt}`;
      const path = `${folder}/${fileName}`;

      const { data, error } = await supabase.storage
        .from('documents')
        .upload(path, file, { upsert: false });

      if (error) throw error;
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
        companion_name: ageNum < 17 ? companion_name : null,
        relation: ageNum < 17 ? relation : null,
        id_front_url,
        id_back_url,
        medical_doc_url,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8">
      {/* Patient name */}
      <input name="patient_name" placeholder="اسم المريض" required className="..." />

      {/* Age */}
      <input
        type="number"
        name="age"
        placeholder="العمر"
        required
        min="1"
        onChange={(e) => setAge(Number(e.target.value))}
        className="..."
      />

      {/* Companion fields – shown only if age < 17 */}
      {age !== '' && Number(age) < 17 && (
        <>
          <input name="companion_name" placeholder="اسم المرافق" required className="..." />
          <input name="relation" placeholder="علاقة المرافق بالمريض" required className="..." />
        </>
      )}

      {/* Images */}
      <input type="file" name="id_front" accept="image/*" required />
      <input type="file" name="id_back" accept="image/*" required />
      <input type="file" name="medical_doc" accept="image/*,application/pdf" required />

      <button type="submit" disabled={loading}>
        {loading ? 'جاري الإرسال...' : 'إرسال'}
      </button>

      {success && <p className="text-green-600">تم الإرسال بنجاح!</p>}
    </form>
  );
}