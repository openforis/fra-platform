import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

export const ODPCommentColumns: Record<OriginalDataPointCommentKey, string> = {
  [TableNames.extentOfForest]: `comments_${TableNames.extentOfForest.toLocaleLowerCase()}`,
  [TableNames.forestCharacteristics]: `comments_${TableNames.forestCharacteristics.toLocaleLowerCase()}`,
}
