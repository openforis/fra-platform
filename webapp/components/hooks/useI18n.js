import { useSelector } from 'react-redux'
import * as UserState from '@webapp/user/userState'

export default () => useSelector(UserState.getI18n)
