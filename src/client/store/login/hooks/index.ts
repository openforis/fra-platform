import { useAppSelector } from 'client/store'
import { AcceptInvitationFormState, InvitationState } from 'client/store/login/stateType'

export const useInvitation = (): InvitationState | undefined => useAppSelector((state) => state.login?.invitation)

export const useAcceptInvitationForm = (): AcceptInvitationFormState | undefined =>
  useAppSelector((state) => state.login?.invitation?.acceptForm)
