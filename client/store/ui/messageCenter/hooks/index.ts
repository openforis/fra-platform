import { useAppSelector } from '@client/store'
import { MessageTopic } from '@meta/messageCenter'

export const useTopics = (): Array<MessageTopic> => useAppSelector((state) => state.ui.messageCenter.topics)
