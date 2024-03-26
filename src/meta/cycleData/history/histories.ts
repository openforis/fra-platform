import { CommentableDescriptionName } from 'meta/assessment'
import { HistoryItemSectionKey } from 'meta/cycleData/history/history'

const getHistoryItemSectionKey = (sectionName: string, name: CommentableDescriptionName): HistoryItemSectionKey => {
  return `${sectionName}-${name}` as HistoryItemSectionKey
}

export const Histories = {
  getHistoryItemSectionKey,
}
