import { Description } from 'meta/assessment'

import { useAssessmentCountry } from 'client/store/area'
import { useHasOriginalDataPointData } from 'client/store/data'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useSectionContext } from 'client/pages/Section/context'

type Props = {
  descriptions: Description
}

export const useDescriptions = (props: Props): Description => {
  const { descriptions } = props

  const { onlyTables } = useIsPrintRoute()
  const country = useAssessmentCountry()
  const { sectionName } = useSectionContext()
  const hasOriginalDataPointData = useHasOriginalDataPointData()
  const useOriginalDataPoint = country?.props?.forestCharacteristics?.useOriginalDataPoint

  if (onlyTables) {
    return {}
  }

  // Only show comments if section has ODP data
  const onlyComments =
    (sectionName === 'extentOfForest' && hasOriginalDataPointData) ||
    (sectionName === 'forestCharacteristics' && hasOriginalDataPointData && useOriginalDataPoint)

  if (onlyComments) {
    return {
      comments: true,
    }
  }

  return {
    nationalData: descriptions.nationalData,
    analysisAndProcessing: descriptions.analysisAndProcessing,
  }
}
