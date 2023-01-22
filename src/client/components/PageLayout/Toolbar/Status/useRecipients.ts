import { useEffect } from 'react'

import { ApiEndPoint } from '@meta/api/endpoint'
import { User } from '@meta/user'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso, useGetRequest } from '@client/hooks'

import { StatusTransition } from './types'

export const useRecipients = (props: { status: StatusTransition }): Array<User> => {
  const { status } = props
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const assessment = useAssessment()
  const { data, dispatch: fetchData } = useGetRequest(ApiEndPoint.User.countryStatusChangeRecipients(), {
    params: {
      countryIso,
      assessmentName: assessment.props.name,
      cycleName: cycle.name,
      status: status.status,
    },
  })

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return data
}
