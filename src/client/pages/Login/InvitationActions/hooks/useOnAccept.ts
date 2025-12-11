import { useNavigate } from 'react-router'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { LoginInvitationQueryParams } from 'meta/routes/queryParams/invitation'
import { Routes } from 'meta/routes/routes'
import { UserInvitation } from 'meta/user/invitation'

import { useAppDispatch } from 'client/store/hooks'
import { UserActions } from 'client/store/user/actions'
import { useSearchParams } from 'client/hooks/searchParams'
import { useToaster } from 'client/hooks/toaster'

type Props = {
  assessment: Assessment
  cycle: Cycle
  userInvitation: UserInvitation
}

export const useOnAccept = (props: Props) => {
  const { assessment, cycle, userInvitation } = props

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { toaster } = useToaster()
  const { invitationUuid } = useSearchParams<LoginInvitationQueryParams>()

  const assessmentName = assessment.props.name
  const cycleName = cycle?.name

  return async (): Promise<void> => {
    const response = await axios.post(ApiEndPoint.User.invitationAccept(), { invitationUuid })
    const { data } = response

    if (data?.message) {
      toaster.info(data.message)
    }

    if (data.user) {
      dispatch(UserActions.setUser(data.user))
      const { countryIso } = userInvitation
      navigate(Routes.Country.generatePath({ assessmentName, cycleName, countryIso }))
    }
  }
}
