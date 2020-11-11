import { useSelector } from 'react-redux'
import * as UserState from '@webapp/store/user/userState'

export default () => useSelector(UserState.getUserInfo)
