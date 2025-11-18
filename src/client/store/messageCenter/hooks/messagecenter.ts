import { MessageTopic } from 'meta/messageCenter/messageTopic'

import { useAppSelector } from 'client/store/hooks'
import { MessageCenterSelectors } from 'client/store/messageCenter/selectors'

export const useTopics = (): Array<MessageTopic> => useAppSelector(MessageCenterSelectors.getTopics)

export const useTopicKeys = (): Array<string> => useTopics()?.map((topic) => topic.key)
