import './Topic.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '@client/components/Icon'
import { useAppDispatch } from '@client/store'
import { useCountryIso } from '@client/hooks'
import { useAssessment, useCycle } from '@client/store/assessment'
import { MessageCenterActions } from '@client/store/ui/messageCenter'
import { MessageTopic } from '@meta/messageCenter'

type TopicProps = {
  topic: MessageTopic
}

const Topic: React.FC<TopicProps> = ({ topic }) => {
  const [message, setMessage] = useState('')

  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const closeTopic = () => {
    dispatch(
      MessageCenterActions.closeTopic({
        key: topic.key,
      })
    )
  }

  const addMessage = () => {
    dispatch(
      MessageCenterActions.addMessage({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        key: topic.key,
        message,
      })
    ).then(() => setMessage(''))
  }

  return (
    <div className="topic">
      <div className="topic-header">
        {topic.key}
        <div className="topic-close" onClick={closeTopic} onKeyDown={closeTopic} role="button" tabIndex={0}>
          <Icon name="remove" />
        </div>
      </div>
      <div className="topic-body">
        <div className="no-comments">
          <Icon className="icon-24" name="chat-46" />
          <br />
          {i18n.t('review.noComments')}
        </div>
      </div>
      <div className="topic-footer">
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="btn-s btn-primary" type="submit" onClick={addMessage}>
          {i18n.t('review.add')}
        </button>
      </div>
    </div>
  )
}

export default Topic
