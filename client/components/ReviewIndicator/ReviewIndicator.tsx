import './ReviewIndicator.scss'
import React from 'react'

import Icon from '@client/components/Icon'
import { useAppDispatch } from '@client/store'
import { useCountryIso } from '@client/hooks'
import { useAssessment, useCycle } from '@client/store/assessment'
import { MessageCenterActions } from '@client/store/ui/messageCenter'

type Props = {
  title: string
  subtitle?: string
  topicKey: string
}

const ReviewIndicator = (props: Props) => {
  const { title, subtitle, topicKey } = props

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
        title,
        subtitle,
        key: topicKey,
      })
    )
  }

  return (
    <button className="review-indicator" onClick={openTopic} type="button">
      <Icon name="circle-add" />
    </button>
  )
}

ReviewIndicator.defaultProps = {
  subtitle: null,
}

export default ReviewIndicator
