import { useAppSelector } from '@client/store'
import { TableSection } from '@meta/assessment'

export const useTableSections = (): Array<TableSection> =>
  useAppSelector((state) => state.pages.assessmentSection.tableSections)
