import { apiPath, joinPaths } from 'meta/api/endpoint/_utils'

export const Auth = {
  google: (): string => apiPath('auth', 'google'),
  googleCallback: (): string => apiPath('auth', 'google', 'callback'),
  login: (): string => joinPaths('auth', 'login'),
  logout: (): string => joinPaths('auth', 'logout'),
  resetPassword: (): string => joinPaths('auth', 'local', 'reset-password'),
}
