import { CountryIso } from 'meta/area/countryIso'
import { ODPNationalClass, OriginalDataPoint, OriginalDataPointComments } from 'meta/assessment/originalDataPoint'
import {
  OriginalDataPointCommentKey,
  OriginalDataPointValues,
} from 'meta/assessment/originalDataPoint/originalDataPoint'
import { TableNames } from 'meta/assessment/table'
import { Objects } from 'utils/objects'

import { ODPCommentColumns } from 'server/db/repository/assessmentCycle/originalDataPoint/commentColumns'

type ODPCommentColName<K extends OriginalDataPointCommentKey = OriginalDataPointCommentKey> = `comments_${Lowercase<K>}`

export type OriginalDataPointDBDeprecated = {
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

export const OriginalDataPointAdapterDeprecated = (row: OriginalDataPointDBDeprecated): OriginalDataPoint => {
  if (Objects.isNil(row)) return null

  const {
    [commentColumnExtent]: commentsExtentOfForest,
    [commentColumnForestCharacteristics]: commentsForestCharacteristics,
    ...rest
  } = row

  const comments: OriginalDataPointComments = {
    [TableNames.extentOfForest]: commentsExtentOfForest,
    [TableNames.forestCharacteristics]: commentsForestCharacteristics,
  }

  return {
    ...(Objects.camelize(rest) as OriginalDataPoint),
    comments,
  }
}

export type OriginalDataPointDB = {
  country_iso: CountryIso
  id: number
  national_classes: Array<ODPNationalClass>
  values: OriginalDataPointValues
  year: number
  comments: OriginalDataPointComments
}

export const OriginalDataPointAdapter = (row: OriginalDataPointDB): OriginalDataPoint => {
  return Objects.camelize(row)
}
