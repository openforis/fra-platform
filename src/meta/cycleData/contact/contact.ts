import { ContactField } from 'meta/cycleData/contact/field'
import { ContactNode } from 'meta/cycleData/contact/node'
import { NodeExt } from 'meta/nodeExt'

export type ContactProps = {
  readOnly?: boolean
  userId?: number
  rowIndex?: number
}

export type Contact = NodeExt<ContactProps, null> & {
  [ContactField.appellation]: ContactNode
  [ContactField.contributions]: ContactNode
  [ContactField.institution]: ContactNode
  [ContactField.name]: ContactNode
  [ContactField.role]: ContactNode
  [ContactField.surname]: ContactNode
}
