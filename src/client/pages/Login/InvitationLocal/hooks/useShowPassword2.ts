import { AuthProvider } from 'meta/user/auth'
import { User } from 'meta/user/user'

type Props = { userProviders: Array<AuthProvider>; invitedUser: User }

export const useShowPassword2 = (props: Props): boolean => {
  const { invitedUser, userProviders } = props

  // Show second password field when the user is registering:
  // - User exists but has no login methods (new user), OR
  // - User has google login but doesn't have local auth yet (adding password)
  const newUser = invitedUser && !userProviders
  const noLocalLogin = userProviders && !userProviders.includes(AuthProvider.local)

  return newUser || noLocalLogin
}
