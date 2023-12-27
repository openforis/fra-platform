import { ContactField } from 'meta/cycleData'
import { NodeExtCellType } from 'meta/nodeExt'

import { NodeExtCell } from 'client/components/TableNodeExt/types'

export type Columns = Record<ContactField, NodeExtCell<NodeExtCellType>>

export type Field = {
  field: ContactField
  hidden: boolean
}

export type Fields = Array<Field>
