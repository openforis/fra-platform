import { useAppSelector } from '@client/store'

export const useSectionTableData = () => useAppSelector((state) => state.data.section?.tableData)
