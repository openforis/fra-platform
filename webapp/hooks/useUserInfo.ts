import { useSelector } from 'react-redux'
import { UserState } from '@webapp/store/user'
import { User } from '@core/auth'

export default (): User => useSelector(UserState.getUserInfo) as User
