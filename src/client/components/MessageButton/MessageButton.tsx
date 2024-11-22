import './MessageButton.scss'
import React, { useEffect, useRef } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { MessageTopicType } from 'meta/messageCenter'
import { Users } from 'meta/user/users'

import { useAppDispatch } from 'client/store'
import { MessageCenterActions } from 'client/store/ui/messageCenter'
import { useUser } from 'client/store/user'
import { useGetRequest } from 'client/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

type Props = {
  topicKey: string
  topicSubtitle?: string
  topicTitle: string
  topicType: MessageTopicType
  label?: string
  className?: string
}

const MessageButton: React.FC<Props> = (props) => {
  const { topicKey, topicSubtitle, topicTitle, topicType, label, className } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const dispatch = useAppDispatch()

  const user = useUser()

  const params = { countryIso, assessmentName, cycleName, key: topicKey }
  const url = ApiEndPoint.MessageCenter.topicUnreadMessages()
  const { data: unreadMessages = 0, dispatch: fetchData } = useGetRequest(url, { params })

  const fetchRef = useRef(fetchData)

  useEffect(() => fetchRef.current(), [fetchRef])

  return (
    <button
      className={className}
      disabled={Users.isAdministrator(user)}
      onClick={() => {
        dispatch(
          MessageCenterActions.openTopic({
            countryIso,
            assessmentName,
            cycleName,
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
  className: 'btn-secondary btn-message',
}

export default MessageButton
