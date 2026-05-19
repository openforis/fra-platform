import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleName } from 'meta/assessment/cycle'
import { AuthProvider } from 'meta/user/auth'
import { UserInvitation } from 'meta/user/invitation'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { useGetRequest } from 'client/hooks/getRequest'

type Data = {
  assessment?: Assessment
  user?: User
  userInvitation?: UserInvitation
  userProviders?: Array<AuthProvider>
}

export type DataInvitation = Data & {
  assessmentName: AssessmentName
  cycleName: CycleName
}

export const useData = (dataProp?: DataInvitation): DataInvitation | undefined => {
  const { invitationUuid } = useParams<{ invitationUuid: string }>()
  const { data = dataProp, dispatch: fetchData } = useGetRequest(ApiEndPoint.User.invitation(), {
    params: { invitationUuid },
  })

  useEffect(() => {
    // Only fetch if dataProp is empty.
    // E.g. when arriving from google redirect to invitation accept page
    if (Objects.isEmpty(dataProp) && invitationUuid) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitationUuid])

  // Add commonly used variables to the exported data object
  return useMemo(() => {
    if (!data?.assessment || !data?.userInvitation) return undefined

    const cycle = Assessments.getCycle({ assessment: data.assessment, cycleUuid: data.userInvitation.cycleUuid })
    const assessmentName = data.assessment.props.name
    const cycleName = cycle?.name

    if (!cycleName) return undefined

    return {
      ...data,
      assessmentName,
      cycleName,
    }
  }, [data])
}
