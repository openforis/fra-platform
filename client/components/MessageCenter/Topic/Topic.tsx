import './Topic.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '@client/components/Icon'
import { MessageTopic } from '@meta/messageCenter'

type TopicProps = {
  topic: MessageTopic
}

const Topic: React.FC<TopicProps> = ({ topic }) => {
  const { i18n } = useTranslation()

  return (
    <div className="topic">
      <div className="topic-header">
        {topic.key}
        <div className="topic-close" onClick={() => null} onKeyDown={() => null} role="button" tabIndex={0}>
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
        <textarea />
        <button className="btn-s btn-primary" type="submit">
          {i18n.t('review.add')}
        </button>
      </div>
    </div>
  )
}

export default Topic
