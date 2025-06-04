import { useAppSelector } from 'client/store/hooks'
import { LoginInformationState } from 'client/store/login/state'

export const useLoginInfo = (): LoginInformationState | undefined => useAppSelector((state) => state.login?.login)
