export interface UserResetPassword {
  readonly uuid: string
  readonly createdAt: string
  readonly userId: number

  changedAt?: string
  active: boolean
}
