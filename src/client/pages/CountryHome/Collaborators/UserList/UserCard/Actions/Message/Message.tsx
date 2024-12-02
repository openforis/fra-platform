import React from 'react'
import { useTranslation } from 'react-i18next'

import { MessageTopicType, Topics } from 'meta/messageCenter'

import { useUser } from 'client/store/user'
import { ButtonSize, ButtonType, useButtonClassName } from 'client/components/Buttons/Button'
import MessageButton from 'client/components/MessageButton'

import { Props } from '../../Props'

const size = ButtonSize.xs
const type = ButtonType.primary

const Message: React.FC<Props> = (props: Props) => {
  const { user } = props
  const currentUser = useUser()
  const { t } = useTranslation()
  const iconName = 'chat-46'

  const label = t('landing.users.message')

  const className = useButtonClassName({ iconName, label, size, type, className: 'home-users-message' })

  return (
    <MessageButton
      className={className}
      label={label}
      topicKey={Topics.getMessageBoardChatKey(user, currentUser)}
      topicSubtitle={t('landing.users.message')}
      topicTitle={user.fullName}
      topicType={MessageTopicType.chat}
    />
  )
}

export default Message
