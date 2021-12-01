export enum AuthProvider {
  google = 'google',
  local = 'local',
}

export interface UserAuthProvider<P = void> {
  id: number
  userId: number
  provider: AuthProvider
  props: P
}
