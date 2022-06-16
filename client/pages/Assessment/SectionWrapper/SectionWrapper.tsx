import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { AssessmentName } from '@meta/assessment'
import { Sockets } from '@meta/socket/sockets'

import { useAppDispatch } from '@client/store'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { ReviewActions } from '@client/store/ui/review'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import MessageCenter from '@client/components/MessageCenter'
import { SocketClient } from '@client/service/socket'
import { DOMs } from '@client/utils/dom'

const SectionWrapper: React.FC = (props) => {
  const { children } = props

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const user = useUser()
  const { assessmentName, cycleName, section } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
    section: string
  }>()

  useEffect(() => {
    // scroll to top
    DOMs.scrollTo()

    // fetch table sections metadata
    dispatch(
      AssessmentSectionActions.getTableSections({
        assessmentName,
        cycleName,
        section,
        countryIso,
      })
    )
    return () => {
      dispatch(AssessmentSectionActions.reset())
    }
  }, [countryIso, assessmentName, cycleName, section])

  // fetch section review status
  useEffect(() => {
    const requestReviewStatusEvent = Sockets.getRequestReviewStatusEvent({
      countryIso,
      assessmentName,
      cycleName,
      sectionName: section,
    })

    const updateReviewStatus = () => {
      dispatch(ReviewActions.getReviewStatus({ countryIso, assessmentName, cycleName, section }))
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
  }, [countryIso, assessmentName, cycleName, section, user])

  return (
    <>
      <MessageCenter />
      {React.Children.toArray(children)}
    </>
  )
}

export default SectionWrapper
