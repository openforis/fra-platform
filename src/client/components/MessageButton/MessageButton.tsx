import './MessageButton.scss'
import React, { useEffect, useRef } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { MessageTopicType } from 'meta/messageCenter'
import { Users } from 'meta/user/users'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { MessageCenterActions } from 'client/store/ui/messageCenter'
import { useUser } from 'client/store/user'
import { useCountryIso, useGetRequest } from 'client/hooks'
import Icon from 'client/components/Icon'

type Props = {
  topicKey: string
  topicSubtitle?: string
  topicTitle: string
  topicType: MessageTopicType
  label?: string
}

const MessageButton: React.FC<Props> = (props) => {
  const { topicKey, topicSubtitle, topicTitle, topicType, label } = props
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const dispatch = useAppDispatch()

  const user = useUser()

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
      className="btn-secondary btn-message"
      disabled={Users.isAdministrator(user)}
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
      type="button"
    >
      <Icon className="icon-middle" name="chat-46" />
      {label}
      {parseInt(unreadMessages, 10) > 0 && <div className="btn-message-count">{unreadMessages}</div>}
    </button>
  )
}

MessageButton.defaultProps = {
  topicSubtitle: '',
  label: undefined,
}

export default MessageButton
