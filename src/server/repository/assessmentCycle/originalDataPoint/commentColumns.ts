import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

export const ODP_COMMENT_COLUMNS_RECORD: Record<OriginalDataPointCommentKey, string> = {
  [TableNames.extentOfForest]: `comments_${TableNames.extentOfForest.toLocaleLowerCase()}`,
  [TableNames.forestCharacteristics]: `comments_${TableNames.forestCharacteristics.toLocaleLowerCase()}`,
}
