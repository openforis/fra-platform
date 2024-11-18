import { CountryUserSummary, User } from 'meta/user'

export interface UserManagementState {
  user?: User
  /**
   * @deprecated
   */
  users: Array<CountryUserSummary>
}
