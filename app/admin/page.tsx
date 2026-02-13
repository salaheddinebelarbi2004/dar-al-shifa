import { createClient } from '@/lib/supabase/server';
import BackToHome from '@/components/back-to-home';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import AdminContent from './AdminContent';

export default async function Admin() {
  return (
    <div
      dir="rtl"
      style={{
        padding: '2rem 1.5rem',
        maxWidth: '1400px',
        margin: '0 auto',
        background: '#f8fafc',
        minHeight: '100vh',
        fontFamily: 'Tajawal, system-ui, sans-serif',
      }}
    >
      <BackToHome />
      {/* Header - static, no dynamic data here */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <h1 style={{ fontSize: '2.4rem', color: '#1e40af', margin: 0 }}>
          لوحة التحكم - دار الشفاء
        </h1>

        <form
          action={async () => {
            'use server';
            const supabaseServer = await createClient();
            await supabaseServer.auth.signOut();
            redirect('/login');
          }}
        >
          <button
            type="submit"
            style={{
              padding: '0.9rem 1.8rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.05rem',
              fontWeight: 500,
              boxShadow: '0 2px 6px rgba(239, 68, 68, 0.3)',
            }}
          >
            تسجيل الخروج
          </button>
        </form>
      </div>

      {/* Suspense wraps everything dynamic (session + fetch) */}
      <Suspense
        fallback={
          <div style={{ textAlign: 'center', padding: '6rem 0', color: '#64748b' }}>
            <p style={{ fontSize: '1.4rem' }}>جاري تحميل لوحة التحكم...</p>
          </div>
        }
      >
        <AdminContent />
      </Suspense>
    </div>
  );
}