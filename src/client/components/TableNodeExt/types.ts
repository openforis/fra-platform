import { ColumnNodeExtType } from 'meta/nodeExt'

import { Option } from 'client/components/Select/types'

export type ColumnNodeExt = {
  type: ColumnNodeExtType
  colName: string
  header: string
  options?: Array<Option>
}
