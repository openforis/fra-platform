import { MessageTopic } from 'meta/messageCenter'

import { useAppSelector } from 'client/store'

export const useTopics = (): Array<MessageTopic> => useAppSelector((state) => state.ui.messageCenter.topics)

export const useTopicKeys = (): Array<string> => useTopics()?.map((topic) => topic.key)
