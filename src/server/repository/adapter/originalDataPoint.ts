import { Objects } from 'utils/objects'

import { OriginalDataPoint, OriginalDataPointComments } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

import { ODP_COMMENT_COLUMNS_RECORD } from 'server/repository/assessmentCycle/originalDataPoint/commentColumns'

type OriginalDataPointDB = Record<string, unknown>

const commentColumnExtent = ODP_COMMENT_COLUMNS_RECORD[TableNames.extentOfForest]
const commentColumnForestCharacteristics = ODP_COMMENT_COLUMNS_RECORD[TableNames.forestCharacteristics]

export const OriginalDataPointAdapter = (row: OriginalDataPointDB): OriginalDataPoint => {
  const {
    [commentColumnExtent]: commentsExtentOfForest,
    [commentColumnForestCharacteristics]: commentsForestCharacteristics,
    ...rest
  } = row as Record<string, unknown>

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
