import { useAppSelector } from '@client/store'

export const useAssessmentPropsName = () => useAppSelector((state) => state.assessment?.assessment?.props.name)
