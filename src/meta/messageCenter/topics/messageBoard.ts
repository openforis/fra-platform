import { User } from 'meta/user'

export const getMessageBoardCountryKey = (): string => `message_board`

export const getMessageBoardChatKey = (userA: User, userB: User): string => {
  const userKeys = [userA.id, userB.id].sort((idA, idB) => idA - idB).join('_')
  const countryKey = getMessageBoardCountryKey()

  return `${countryKey}_chat_${userKeys}`
}
