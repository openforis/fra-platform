import { CommentableDescriptionName } from 'meta/assessment'
import { HistoryItemSectionKey } from 'meta/cycleData/history/history'

const getHistoryItemSectionKey = (sectionName: string, name: CommentableDescriptionName): HistoryItemSectionKey => {
  return `${sectionName}-${name}` as HistoryItemSectionKey
}

const getHistoryItemKeyParts = (
  sectionKey: HistoryItemSectionKey
): { sectionName: string; name: CommentableDescriptionName } => {
  const [sectionName, name] = sectionKey.split('-')
  return { sectionName, name: name as CommentableDescriptionName }
}

export const Histories = {
  getHistoryItemSectionKey,
  getHistoryItemKeyParts,
}
