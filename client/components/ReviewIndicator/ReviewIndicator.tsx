import './ReviewIndicator.scss'
import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { MessageTopicType } from '@meta/messageCenter'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { MessageCenterActions } from '@client/store/ui/messageCenter'
import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'

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
  const { section } = useParams<{ section?: string }>()

  const openTopic = useCallback(() => {
    dispatch(
      MessageCenterActions.openTopic({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        title,
        subtitle,
        key: topicKey,
        type: MessageTopicType.review,
        section,
      })
    )
  }, [dispatch, countryIso, assessment, cycle, title, subtitle, topicKey, section])

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
