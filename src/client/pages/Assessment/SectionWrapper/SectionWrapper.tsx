import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { AssessmentName } from '@meta/assessment'
import { Sockets } from '@meta/socket'

import { useAppDispatch } from '@client/store'
import { useGetTableSections } from '@client/store/pages/assessmentSection/hooks/useGetTableSections'
import { ReviewActions } from '@client/store/ui/review'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import MessageCenter from '@client/components/MessageCenter'
import { SocketClient } from '@client/service/socket'
import { DOMs } from '@client/utils/dom'

type Props = {
  children: JSX.Element
}

const SectionWrapper: React.FC<Props> = (props) => {
  const { children } = props

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const user = useUser()
  const { assessmentName, cycleName, sectionName } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
    sectionName: string
  }>()

  useGetTableSections()

  useEffect(() => {
    // scroll to top
    DOMs.scrollTo()
  }, [sectionName])

  // fetch section review status
  useEffect(() => {
    const requestReviewStatusEvent = Sockets.getRequestReviewStatusEvent({
      countryIso,
      assessmentName,
      cycleName,
      sectionName,
    })

    const updateReviewStatus = () => {
      dispatch(ReviewActions.getReviewStatus({ countryIso, assessmentName, cycleName, sectionName }))
    }

    if (user) {
      updateReviewStatus()
      SocketClient.on(requestReviewStatusEvent, updateReviewStatus)
    }

    return () => {
      if (user) {
        SocketClient.off(requestReviewStatusEvent, updateReviewStatus)
      }
    }
  }, [countryIso, assessmentName, cycleName, sectionName, user, dispatch])

  return (
    <>
      <MessageCenter />
      {React.Children.toArray(children)}
    </>
  )
}

export default SectionWrapper
