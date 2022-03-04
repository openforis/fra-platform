import { useAppSelector } from '@client/store'
import { TableSection } from '@meta/assessment'
import { TableData } from '@meta/data'

export const useTableSections = (): Array<TableSection> =>
  useAppSelector((state) => state.pages.assessmentSection.tableSections)

export const useTableData = (): TableData => useAppSelector((state) => state.pages.assessmentSection.data)
