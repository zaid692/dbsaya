'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  
  useEffect(() => {
    localStorage.setItem('isAdmin', 'false')
  }, [])

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    if (email === 'admin@example.com' && password === 'admin123') {
      
      localStorage.setItem('isAdmin', 'true')

      router.push('/home')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-14 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>

        <input
          type="email"
          name="email"
          placeholder="enter your Email"
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Admin Password"
          required
          className="w-full mb-6 p-3 border border-gray-300 rounded"
        />

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-400 text-white py-2 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  )
}
