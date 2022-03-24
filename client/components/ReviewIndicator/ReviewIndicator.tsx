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

  const click = () => {
    dispatch(
      MessageCenterActions.open({
        countryIso,
        assessmentId: assessment.id,
        cycleId: cycle.id,
        title,
        key: Topics.getDataReviewTopicKey(row),
      })
    )
  }

  return (
    <div className="review-indicator" onClick={click} aria-hidden="true" role="button">
      <Icon name="circle-add" />
    </div>
  )
}

export default ReviewIndicator
