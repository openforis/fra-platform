import './MessageButton.scss'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { MessageTopicType } from 'meta/messageCenter'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { MessageCenterActions } from 'client/store/ui/messageCenter'
import { useCountryIso, useGetRequest } from 'client/hooks'
import Icon from 'client/components/Icon'

type Props = {
  topicKey: string
  topicSubtitle?: string
  topicTitle: string
  topicType: MessageTopicType
}

const MessageButton: React.FC<Props> = ({ topicKey, topicSubtitle, topicTitle, topicType }) => {
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const i18n = useTranslation()
  const dispatch = useAppDispatch()

  const { data: unreadMessages = 0, dispatch: fetchData } = useGetRequest(
    ApiEndPoint.MessageCenter.topicUnreadMessages(),
    {
      params: {
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        key: topicKey,
      },
    }
  )

  const fetchRef = useRef(fetchData)

  useEffect(() => fetchRef.current(), [fetchRef])

  return (
    <button
      type="button"
      className="btn-secondary btn-message"
      onClick={() => {
        dispatch(
          MessageCenterActions.openTopic({
            countryIso,
            assessmentName: assessment.props.name,
            cycleName: cycle.name,
            key: topicKey,
            subtitle: topicSubtitle,
            title: topicTitle,
            type: topicType,
          })
        )
      }}
    >
      <Icon name="chat-46" className="icon-middle" />
      {i18n.t<string>('landing.users.message')}
      {parseInt(unreadMessages, 10) > 0 && <div className="btn-message-count">{unreadMessages}</div>}
    </button>
  )
}

MessageButton.defaultProps = {
  topicSubtitle: '',
}

export default MessageButton
