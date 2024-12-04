import './MessageButton.scss'
import React, { useCallback, useEffect, useRef } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { MessageTopic } from 'meta/messageCenter'
import { Users } from 'meta/user/users'

import { useAppDispatch } from 'client/store'
import { MessageCenterActions } from 'client/store/ui/messageCenter'
import { useUser } from 'client/store/user'
import { useGetRequest } from 'client/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonProps } from 'client/components/Buttons/Button'

type Props = Pick<ButtonProps, 'inverse' | 'label' | 'size'> & {
  topic: Pick<MessageTopic, 'key' | 'subtitle' | 'type'> & { title: string }
}

const MessageButton: React.FC<Props> = (props) => {
  const { inverse, label, size, topic } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const dispatch = useAppDispatch()

  const user = useUser()

  const params = { countryIso, assessmentName, cycleName, key: topic.key }
  const url = ApiEndPoint.MessageCenter.topicUnreadMessages()
  const { data: unreadMessages = 0, dispatch: fetchData } = useGetRequest(url, { params })

  const fetchRef = useRef(fetchData)

  const onClick = useCallback(() => {
    const params = { assessmentName, countryIso, cycleName, ...topic }
    dispatch(MessageCenterActions.openTopic(params))
  }, [assessmentName, countryIso, cycleName, dispatch, topic])

  useEffect(() => fetchRef.current(), [fetchRef])

  return (
    <Button
      disabled={Users.isAdministrator(user)}
      iconName="chat-46"
      inverse={inverse}
      label={
        <>
          {label}
          {parseInt(unreadMessages, 10) > 0 && <div className="btn-message-count">{unreadMessages}</div>}
        </>
      }
      onClick={onClick}
      size={size}
    />
  )
}

export default MessageButton
