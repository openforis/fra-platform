import React from 'react'
import { useTranslation } from 'react-i18next'

import { MessageTopicType, Topics } from 'meta/messageCenter'

import { useUser } from 'client/store/user'
import { ButtonSize } from 'client/components/Buttons/Button'
import MessageButton from 'client/pages/CountryHome/MessageButton'

import { Props } from '../../Props'

const Message: React.FC<Props> = (props: Props) => {
  const { user } = props

  const { t } = useTranslation()
  const currentUser = useUser()

  return (
    <MessageButton
      label={t('landing.users.message')}
      size={ButtonSize.xs}
      topic={{
        key: Topics.getMessageBoardChatKey(user, currentUser),
        subtitle: t('landing.users.message'),
        title: user.fullName,
        type: MessageTopicType.chat,
      }}
    />
  )
}

export default Message
