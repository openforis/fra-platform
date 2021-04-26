import { useSelector } from 'react-redux'
import { UserState } from '@webapp/store/user'

export default () => useSelector(UserState.getUserInfo) as any
