import { useAppSelector } from '@client/store'

export const useSectionData = () => useAppSelector((state) => state.data.section)
