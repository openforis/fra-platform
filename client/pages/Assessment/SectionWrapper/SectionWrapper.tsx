import React, { useEffect } from 'react'
import { useParams } from 'react-router'

import { AssessmentName } from '@meta/assessment'
import { Sockets } from '@meta/socket/sockets'

import { useAppDispatch } from '@client/store'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { ReviewActions } from '@client/store/ui/review'
import { useUser } from '@client/store/user'
import { useCountryIso, useOnUpdate } from '@client/hooks'
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
  }, [countryIso, assessmentName, cycleName, section])

  // fetch section review status
  useEffect(() => {
    if (user) {
      dispatch(ReviewActions.getReviewStatus({ countryIso, assessmentName, cycleName, section }))
    }
  }, [countryIso, assessmentName, cycleName, section, user])

  // fetch section summary
  useEffect(() => {
    const updateReviewSummaryEvent = Sockets.getUpdateReviewSummaryEvent({ countryIso, assessmentName, cycleName })

    const updateReviewSummaryEventHandler = () => {
      dispatch(ReviewActions.getReviewSummary({ countryIso, assessmentName, cycleName }))
    }

    if (user) {
      dispatch(ReviewActions.getReviewSummary({ countryIso, assessmentName, cycleName }))
      SocketClient.on(updateReviewSummaryEvent, updateReviewSummaryEventHandler)
    }

    return () => {
      if (user) {
        SocketClient.off(updateReviewSummaryEvent, updateReviewSummaryEventHandler)
      }
    }
  }, [countryIso, assessmentName, cycleName, user])

  // reset store
  useOnUpdate(() => {
    return () => {
      dispatch(AssessmentSectionActions.reset())
      dispatch(ReviewActions.reset())
    }
  }, [countryIso, assessmentName, cycleName])

  return <>{React.Children.toArray(children)}</>
}

export default SectionWrapper
