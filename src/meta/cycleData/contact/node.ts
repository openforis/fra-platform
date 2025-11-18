import { ContactField } from 'meta/cycleData/contact/field'
import { NodeExt } from 'meta/nodeExt/nodeExt'

export type ContactNodeProps = {
  field: ContactField
}

export type ContactNode = NodeExt<ContactNodeProps> & {
  parentUuid: string
}
