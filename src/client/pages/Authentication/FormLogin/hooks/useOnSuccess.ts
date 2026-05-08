import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'

import { Assessments } from 'meta/assessment/assessments'
import { LoginLocalResponse } from 'meta/auth/local'
import { LoginQueryParams } from 'meta/routes/queryParams/login'
import { Routes } from 'meta/routes/routes'
import { InvitationData } from 'meta/user/invitations/invitation'

import { useAppDispatch } from 'client/store/hooks'
import { UserActions } from 'client/store/user/actions'
import { useSearchParams } from 'client/hooks/searchParams'
import { useToaster } from 'client/hooks/toaster'
import { FormProps } from 'client/components/Form/types'

type Props = {
  invitationData?: InvitationData
}

export const useOnSuccess = (props: Props = {}): NonNullable<FormProps['onSuccess']> => {
  const { invitationData } = props
  const { invitationUuid } = useSearchParams<LoginQueryParams>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { toaster } = useToaster()

  // The redirect url. If invitation -> redirect after success to accept invitation
  const redirectTo = useMemo<string>(() => {
    if (!invitationData || !invitationUuid) return Routes.Root.path.absolute
    const cycle = Assessments.getCycle({
      assessment: invitationData.assessment,
      cycleUuid: invitationData.userInvitation.cycleUuid,
    })
    return Routes.LoginInvitation.generatePath({
      assessmentName: invitationData.assessment.props.name,
      cycleName: cycle.name,
      invitationUuid,
    })
  }, [invitationData, invitationUuid])

  return useCallback<NonNullable<FormProps['onSuccess']>>(
    async (_values, response): Promise<void> => {
      const { info, user } = (await response.json()) as LoginLocalResponse

      dispatch(UserActions.setUser(user))
      navigate(redirectTo)

      if (info?.message) {
        toaster.info(info.message)
      }
    },
    [dispatch, navigate, redirectTo, toaster]
  )
}
