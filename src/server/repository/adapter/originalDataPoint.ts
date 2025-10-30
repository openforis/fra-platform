import { Objects } from 'utils/objects'

import {
  ODP_COMMENT_COLUMN_EXTENT,
  ODP_COMMENT_COLUMN_FOREST_CHARACTERISTICS,
  OriginalDataPoint,
  OriginalDataPointComments,
} from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

type OriginalDataPointDB = Record<string, unknown>

export const OriginalDataPointAdapter = (row: OriginalDataPointDB): OriginalDataPoint => {
  const {
    [ODP_COMMENT_COLUMN_EXTENT]: commentsExtentOfForest,
    [ODP_COMMENT_COLUMN_FOREST_CHARACTERISTICS]: commentsForestCharacteristics,
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
