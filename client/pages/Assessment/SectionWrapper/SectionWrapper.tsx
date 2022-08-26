import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { AssessmentName } from '@meta/assessment'
import { Sockets } from '@meta/socket'

import { useAppDispatch } from '@client/store'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
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

  useEffect(() => {
    // scroll to top
    DOMs.scrollTo()

    // fetch table sections metadata
    dispatch(
      AssessmentSectionActions.getTableSections({
        assessmentName,
        cycleName,
        sectionNames: [sectionName],
        countryIso,
      })
    )

    return () => {
      dispatch(AssessmentSectionActions.reset())
    }
  }, [assessmentName, countryIso, cycleName, dispatch, sectionName])

  // fetch section review status
  useEffect(() => {
    const requestReviewStatusEvent = Sockets.getRequestReviewStatusEvent({
      countryIso,
      assessmentName,
      cycleName,
      sectionName,
    })

    const updateReviewStatus = () => {
      dispatch(ReviewActions.getReviewStatus({ countryIso, assessmentName, cycleName, section: sectionName }))
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
