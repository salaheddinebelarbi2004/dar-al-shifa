'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FaHospitalSymbol, FaUserMd, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import BackToHome from '@/components/back-to-home'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/admin')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-2">
      <BackToHome />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-blue-100">
        <div className="flex flex-col items-center mb-6">
          <FaHospitalSymbol className="text-4xl text-blue-700 mb-2" />
          <h1 className="text-2xl font-bold text-blue-800 mb-1 flex items-center gap-2">
            <FaUserMd /> تسجيل دخول الإدارة
          </h1>
          <span className="text-blue-600 font-semibold">دار الشفاء</span>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label className="flex items-center gap-2 font-medium text-slate-700">
            <FaEnvelope className="text-blue-600" />
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full rounded-lg px-4 py-2 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            placeholder="أدخل البريد الإلكتروني"
            autoComplete="username"
          />

          <label className="flex items-center gap-2 font-medium text-slate-700">
            <FaLock className="text-blue-600" />
            كلمة المرور
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full rounded-lg px-4 py-2 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition pr-10"
              placeholder="أدخل كلمة المرور"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-600"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="text-red-600 text-center">{error}</p>}

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
                جاري الدخول...
              </>
            ) : (
              <>
                <FaUserMd /> دخول
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}