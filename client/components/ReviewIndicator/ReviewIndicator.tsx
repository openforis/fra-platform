import './ReviewIndicator.scss'
import React from 'react'

import Icon from '@client/components/Icon'
import { useAppDispatch } from '@client/store'
import { useCountryIso } from '@client/hooks'
import { useAssessment, useCycle } from '@client/store/assessment'
import { Row } from '@meta/assessment'
import { MessageCenterActions } from '@client/store/ui/messageCenter'
import { Topics } from '@meta/messageCenter'

type Props = {
  row: Row
  title: string
}

const ReviewIndicator = (props: Props) => {
  const { row, title } = props

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const openTopic = () => {
    dispatch(
      MessageCenterActions.openTopic({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        key: Topics.getDataReviewTopicKey(row),
        title,
      })
    )
  }

  return (
    <div className="review-indicator" onClick={openTopic} aria-hidden="true" role="button">
      <Icon name="circle-add" />
    </div>
  )
}

export default ReviewIndicator
