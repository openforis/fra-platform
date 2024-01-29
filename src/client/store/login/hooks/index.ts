import { useAppSelector } from 'client/store'
import { InvitationState } from 'client/store/login/stateType'

export const useInvitation = (): InvitationState | undefined => useAppSelector((state) => state.login?.invitation)
