enum Role {
  'ADMIN' = 'ADMIN',
  'COLLABORATOR' = 'COLLABORATOR',
  'NATIONAL_CORRESPONDENT' = 'NATIONAL_CORRESPONDENT',
  'REVIEWER' = 'REVIEWER',
  'VIEWER' = 'VIEWER',
}

interface UserRole<P = void> {
  role: Role
  props: P
}

export interface UserAuth {
  id: number
  userId: number
  assessmentId?: number
  roles: Array<UserRole>
}
