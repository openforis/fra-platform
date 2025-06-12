import { MessageTopic } from 'meta/messageCenter'

export type MessageCenterState = {
  topics: Array<MessageTopic>
}

export const initialState: MessageCenterState = {
  topics: Array<MessageTopic>(),
}
