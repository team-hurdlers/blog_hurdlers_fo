'use client'

import { SessionProvider as Provider } from 'next-auth/react'

export function SessionWrapper({ children }) {
  return <Provider>{children}</Provider>
}
