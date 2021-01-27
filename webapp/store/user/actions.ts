import axios from 'axios'

import { applicationError } from '@webapp/components/error/actions'

export const appUserLogout = 'app/user/logout'

export const logout = () => async (dispatch: any) => {
  try {
    await axios.post(`/auth/logout`)
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Location'... Remove this comment to see the full error message
    window.location = '/'
  } catch (err) {
    dispatch(applicationError(err))
  }
}
