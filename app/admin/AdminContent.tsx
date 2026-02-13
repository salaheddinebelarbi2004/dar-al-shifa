import { createClient } from '@/lib/supabase/server';
import AdminTable from './AdminTable';
import { redirect } from 'next/navigation';

export default async function AdminContent() {
  const supabase = await createClient();

  // Ensure the user is authenticated server-side. If not, redirect to login.
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    return (
      <div style={{ color: 'red', textAlign: 'center', padding: '3rem' }}>
        خطأ في التحقق من الجلسة: {sessionError.message}
      </div>
    );
  }

  if (!session) {
    redirect('/login');
  }

  // Authenticated — fetch submissions
  const { data: submissions, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', padding: '3rem' }}>
        خطأ في جلب البيانات: {error.message}
      </div>
    );
  }

  return <AdminTable submissions={submissions} />;
}