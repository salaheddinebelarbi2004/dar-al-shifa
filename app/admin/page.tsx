import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Admin() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data: submissions } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1>لوحة التحكم - دار الشفاء</h1>
      <table>
        <thead>
          <tr>
            <th>اسم المريض</th>
            <th>العمر</th>
            <th>تاريخ التقديم</th>
            <th>صور</th>
          </tr>
        </thead>
        <tbody>
          {submissions?.map(s => (
            <tr key={s.id}>
              <td>{s.patient_name}</td>
              <td>{s.age}</td>
              <td>{new Date(s.created_at).toLocaleString('ar-DZ')}</td>
              <td>
                <a href={s.id_front_url} target="_blank">بطاقة أمام</a> |
                <a href={s.id_back_url} target="_blank">بطاقة خلف</a> |
                <a href={s.medical_doc_url} target="_blank">الوثيقة الطبية</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}