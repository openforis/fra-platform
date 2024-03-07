import { useAppSelector } from 'client/store'
import { AcceptInvitationFormState, InvitationState, LoginInformationState } from 'client/store/login/stateType'

export const useAcceptInvitationForm = (): AcceptInvitationFormState | undefined =>
  useAppSelector((state) => state.login?.invitation?.acceptForm)

export const useInvitation = (): InvitationState | undefined => useAppSelector((state) => state.login?.invitation)

export const useLoginInfo = (): LoginInformationState | undefined => useAppSelector((state) => state.login?.login)
