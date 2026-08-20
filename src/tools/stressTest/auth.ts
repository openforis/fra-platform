import http from 'k6/http'

import { baseUrl, email, password, token } from './config.ts'

// Runs in k6 setup(), once per run. Returns the fra-auth-token cookie value used by every request.
export const getToken = (): string => {
  if (baseUrl.toLowerCase().includes('fra-data.fao.org')) {
    throw new Error(`refusing to run against production host ${baseUrl}`)
  }

  if (token) return token

  if (!email || !password) {
    throw new Error('Set STRESS_TEST_EMAIL and STRESS_TEST_PASSWORD')
  }

  const response = http.post(`${baseUrl}/auth/login`, JSON.stringify({ email, password }), {
    headers: { 'Content-Type': 'application/json' },
  })

  const cookieToken = response.cookies['fra-auth-token']?.[0]?.value
  if (!cookieToken) throw new Error(`login failed at ${baseUrl}/auth/login (status ${response.status})`)

  return cookieToken
}
