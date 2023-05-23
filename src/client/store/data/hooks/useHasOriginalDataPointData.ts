import { useOriginalDataPointData } from '@client/store/data/hooks/useOriginalDataPointData'

export const useHasOriginalDataPointData = (): boolean => Object.keys(useOriginalDataPointData() ?? {}).length > 0
