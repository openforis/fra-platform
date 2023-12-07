import { Label } from 'meta/assessment'
import { ColumnNodeExtType } from 'meta/nodeExt'

import { Option } from 'client/components/Inputs/Select/types'

export type ColumnNodeExt = {
  type: ColumnNodeExtType
  props: {
    colName: string
    header: string
    // label is passed as Label, but translated before rendering
    options?: Array<Omit<Option, 'label'> & { label: Label }>
  }
}
