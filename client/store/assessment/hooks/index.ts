import { useAppSelector } from '@client/store'
import { Assessment } from '@core/meta/assessment'

export const useAssessment = (): Assessment => useAppSelector((state) => state.assessment?.assessment)
