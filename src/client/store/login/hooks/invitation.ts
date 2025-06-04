import { useAppSelector } from 'client/store/hooks'
import { AcceptInvitationFormState, InvitationState } from 'client/store/login/state'

export const useInvitation = (): InvitationState | undefined => useAppSelector((state) => state.login?.invitation)

export const useAcceptInvitationForm = (): AcceptInvitationFormState | undefined =>
  useAppSelector((state) => state.login?.invitation?.acceptForm)
