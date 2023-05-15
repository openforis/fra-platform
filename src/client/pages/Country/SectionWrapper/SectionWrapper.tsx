import React, { useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'

import { AssessmentName } from '@meta/assessment'
import { Sockets } from '@meta/socket'

import { useAppDispatch } from '@client/store'
import { useAssessmentSections } from '@client/store/assessment'
import { useGetTableSections, useTableSections } from '@client/store/metadata'
import { useOriginalDataPoint } from '@client/store/ui/originalDataPoint'
import { ReviewActions } from '@client/store/ui/review'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import MessageCenter from '@client/components/MessageCenter'
import { SocketClient } from '@client/service/socket'
import { DOMs } from '@client/utils/dom'

type Props = {
  children: JSX.Element
}

type SectionParams = {
  assessmentName: AssessmentName
  cycleName: string
  sectionName: string
}

const SectionWrapper: React.FC<Props> = (props) => {
  const { children } = props

  const { assessmentName, cycleName, sectionName } = useParams<SectionParams>()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const user = useUser()
  const sections = useAssessmentSections()
  const tableSections = useTableSections({ sectionName })
  const originalDataPoint = useOriginalDataPoint()
  useGetTableSections()

  useLayoutEffect(() => {
    // scroll to top
    DOMs.scrollTo()
  }, [sectionName])

  // subscribe to section review status update
  useEffect(() => {
    const requestReviewStatusEvent = Sockets.getRequestReviewStatusEvent({
      countryIso,
      assessmentName,
      cycleName,
      sectionName,
    })

    const updateReviewStatus = () => {
      dispatch(
        ReviewActions.getReviewStatus({
          countryIso,
          assessmentName,
          cycleName,
          sectionName,
          odpId: originalDataPoint?.id,
        })
      )
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
  }, [countryIso, assessmentName, cycleName, sectionName, user, dispatch, originalDataPoint?.id])

  if (!sections || !tableSections) return null

  return (
    <>
      <MessageCenter />
      {React.Children.toArray(children)}
    </>
  )
}

export default SectionWrapper
