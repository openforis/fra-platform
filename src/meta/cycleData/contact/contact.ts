import { NodeExt } from 'meta/nodeExt'

export enum ContactField {
  appellation = 'appellation',
  contributions = 'contributions',
  institution = 'institution',
  name = 'name',
  role = 'role',
  surname = 'surname',
}

export type ContactNodeProps = {
  field: ContactField
}

export type ContactNode = NodeExt<ContactNodeProps> & {
  parentUuid: string
}

export type ContactProps = {
  readOnly?: boolean
  rowIndex?: number
}

export type Contact = NodeExt<ContactProps, null> & {
  [ContactField.appellation]: ContactNode
  [ContactField.contributions]: ContactNode
  [ContactField.institution]: ContactNode
  [ContactField.name]: ContactNode
  [ContactField.role]: ContactNode
  [ContactField.surname]: ContactNode
  placeholder?: boolean
}

export const contactFields: Array<ContactField> = [
  ContactField.appellation,
  ContactField.name,
  ContactField.surname,
  ContactField.role,
  ContactField.institution,
  ContactField.contributions,
]
