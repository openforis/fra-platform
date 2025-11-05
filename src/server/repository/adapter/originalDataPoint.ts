import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { ODPNationalClass, OriginalDataPoint, OriginalDataPointComments } from 'meta/assessment/originalDataPoint'
import {
  OriginalDataPointCommentKey,
  OriginalDataPointValues,
} from 'meta/assessment/originalDataPoint/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

import { ODPCommentColumns } from 'server/repository/assessmentCycle/originalDataPoint/commentColumns'

type ODPCommentColName<K extends OriginalDataPointCommentKey = OriginalDataPointCommentKey> = `comments_${Lowercase<K>}`

type OriginalDataPointDB = {
  [K in ODPCommentColName]: string
} & {
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

const commentColumnExtent = ODPCommentColumns[TableNames.extentOfForest] as ODPCommentColName<TableNames.extentOfForest>
const commentColumnForestCharacteristics = ODPCommentColumns[
  TableNames.forestCharacteristics
] as ODPCommentColName<TableNames.forestCharacteristics>

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
