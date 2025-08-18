'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {
  const { data: session } = useSession()

  return session ? (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="px-4 py-1.5 text-gray-700 font-medium bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-200 transition duration-200"
    >
      Sign out
    </button>
  ) : (
    <button
      onClick={() => signIn('google')}
      className="px-6 py-3 text-gray-700 font-medium bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-200 transition duration-200"
    >
      Sign in with Google
    </button>
  )
}
