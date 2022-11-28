export enum AuthProvider {
  google = 'google',
  local = 'local',
}

export interface AuthProviderGoogleProps {
  email: string
}

export interface AuthProviderLocalProps {
  password: string
}

export interface UserAuthProvider<P = void> {
  id: number
  userId: number
  provider: AuthProvider
  props: P
}
