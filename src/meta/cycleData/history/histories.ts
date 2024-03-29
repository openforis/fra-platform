import { HistoryItemSectionKey } from 'meta/cycleData/history/history'

const getHistoryItemSectionKey = (sectionName: string, subSection: string, name: string): HistoryItemSectionKey => {
  return `${sectionName}-${subSection}-${name}` as HistoryItemSectionKey
}

const getHistoryItemKeyParts = (
  key: HistoryItemSectionKey
): { sectionName: string; subSection: string; name: string } => {
  const [sectionName, subSection, name] = key.split('-')
  return { sectionName, subSection, name }
}

export const Histories = {
  getHistoryItemSectionKey,
  getHistoryItemKeyParts,
}
