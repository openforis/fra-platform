import { useAppSelector } from 'client/store/store'
import { AssessmentFilesState } from 'client/store/ui/assessmentFiles/stateType'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useAssessmentFiles = (): AssessmentFilesState => useAppSelector((state) => state.ui.assessmentFiles)

export const useAssessmentCountryFiles = () => {
  const assessmentFiles = useAssessmentFiles()
  const { countryIso } = useCountryRouteParams()
  return assessmentFiles[countryIso] ?? []
}
