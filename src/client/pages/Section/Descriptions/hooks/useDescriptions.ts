import { Description } from 'meta/assessment/description'
import { Descriptions } from 'meta/assessment/descriptions'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useHasOriginalDataPointData } from 'client/store/data/tableData/nodeValues/hooks/originalDataPointData'
import { useIsPrintRoute } from 'client/hooks/routes'
import { useSectionContext } from 'client/pages/Section/context'

type Props = {
  descriptions: Description
}

export const useDescriptions = (props: Props): Description => {
  const { descriptions } = props

  const { onlyTables } = useIsPrintRoute()
  const country = useAssessmentCountry()
  const { sectionName } = useSectionContext()
  const hasNationalDataPointData = useHasOriginalDataPointData()
  const useNationalDataPoint = Boolean(country?.props?.forestCharacteristics?.useOriginalDataPoint)

  if (onlyTables) {
    return {}
  }

  const onlyComments = Descriptions.hasSectionOnlyComments({
    hasNationalDataPointData,
    sectionName,
    useNationalDataPoint,
  })

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
