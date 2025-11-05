import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { ODPNationalClass, OriginalDataPoint, OriginalDataPointComments } from 'meta/assessment/originalDataPoint'
import { OriginalDataPointValues } from 'meta/assessment/originalDataPoint/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

import { ODPCommentColumns } from 'server/repository/assessmentCycle/originalDataPoint/commentColumns'

const commentColumnExtent = ODPCommentColumns[TableNames.extentOfForest]
const commentColumnForestCharacteristics = ODPCommentColumns[TableNames.forestCharacteristics]

type OriginalDataPointDB = {
  [commentColumnExtent]: string
  [commentColumnForestCharacteristics]: string
  country_iso: CountryIso
  data_source_additional_comments: string | null
  data_source_methods: string | null
  data_source_references: string | null
  id_legacy: number | null
  id: number
  national_classes: Array<ODPNationalClass>
  values: OriginalDataPointValues
  year: number
}

export const OriginalDataPointAdapter = (row: OriginalDataPointDB): OriginalDataPoint => {
  const {
    [commentColumnExtent]: commentsExtentOfForest,
    [commentColumnForestCharacteristics]: commentsForestCharacteristics,
    ...rest
  } = row

  const comments: OriginalDataPointComments = {}

  if (!Objects.isNil(commentsExtentOfForest)) {
    comments[TableNames.extentOfForest] = commentsExtentOfForest as string
  }

  if (!Objects.isNil(commentsForestCharacteristics)) {
    comments[TableNames.forestCharacteristics] = commentsForestCharacteristics as string
  }

  return {
    ...(Objects.camelize(rest) as OriginalDataPoint),
    comments,
  }
}
