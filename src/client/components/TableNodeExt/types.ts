import { ColumnNodeExtType } from 'meta/nodeExt'

import { Option } from 'client/components/Inputs/Select/types'

export type ColumnNodeExt = {
  type: ColumnNodeExtType
  props: {
    colName: string
    header: string
    options?: Array<Option>
  }
}
