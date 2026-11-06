import { getChatUserIds, isChatKey } from './chat'

describe('isChatKey', () => {
  test('table row review key', () => {
    expect(isChatKey('dataRow_9a7b')).toBe(false)
  })
})

describe('getChatUserIds', () => {
  test('returns none for three user ids', () => {
    expect(getChatUserIds('message_board_chat_3_7_9')).toEqual([])
  })

  test('returns none for a single user id', () => {
    expect(getChatUserIds('message_board_chat_3')).toEqual([])
  })

  test('returns none for ids that are not numbers', () => {
    expect(getChatUserIds('message_board_chat_3_abc')).toEqual([])
  })

  test('returns none for ids with a leading zero', () => {
    expect(getChatUserIds('message_board_chat_03_7')).toEqual([])
  })

  test('returns none for a zero id', () => {
    expect(getChatUserIds('message_board_chat_0_7')).toEqual([])
  })

  test('returns none for the same user twice', () => {
    expect(getChatUserIds('message_board_chat_3_3')).toEqual([])
  })

  test('returns none for a key that is not a chat key', () => {
    expect(getChatUserIds('message_board')).toEqual([])
  })
})
