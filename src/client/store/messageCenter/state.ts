import { MessageTopic } from 'meta/messageCenter/messageTopic'

export type MessageCenterState = {
  topics: Array<MessageTopic>
}

export const initialState: MessageCenterState = {
  topics: Array<MessageTopic>(),
}
