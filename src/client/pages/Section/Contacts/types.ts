import { ContactField } from 'meta/cycleData/contact/field'
import { NodeExtCellType } from 'meta/nodeExt/cellType'

import { NodeExtCell } from 'client/components/TableNodeExt/types'

export type Columns = Record<ContactField, NodeExtCell<NodeExtCellType>>

export type Field = {
  field: ContactField
  hidden: boolean
}

export type Fields = Array<Field>
