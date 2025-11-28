import { UUID } from 'meta/uuid/uuid'

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
  readonly id: number
  readonly userUuid: UUID
  provider: AuthProvider
  props: P
}
