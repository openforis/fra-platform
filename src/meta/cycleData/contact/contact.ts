import { NodeExt } from 'meta/nodeExt'
import { RoleName } from 'meta/user/userRole'

type SectionUUID = string

export interface ContactValue {
  appellation: string
  contributions: Array<SectionUUID>
  institution: string
  name: string
  role: RoleName.NATIONAL_CORRESPONDENT | RoleName.ALTERNATE_NATIONAL_CORRESPONDENT | RoleName.COLLABORATOR
  surname: string
}

export interface ContactProps {
  // When populating contacts from current users:
  // set readOnly to true
  readOnly?: boolean
  // and don't set rowIndex
  // row index is the position of new, editable contacts in table
  rowIndex?: number
}

export type Contact = NodeExt<ContactProps, ContactValue>
