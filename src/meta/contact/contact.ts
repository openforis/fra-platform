import { SectionName } from 'meta/assessment'
import { NodeExt } from 'meta/nodeExt'
import { RoleName } from 'meta/user/userRole'

export interface ContactValue {
  appellation: string
  contributions: Array<SectionName>
  institution: string
  name: string
  role: RoleName.NATIONAL_CORRESPONDENT | RoleName.ALTERNATE_NATIONAL_CORRESPONDENT | RoleName.COLLABORATOR
  surname: string
}

export interface ContactProps {
  readOnly?: boolean
  rowIndex: number
}

export type Contact = NodeExt<ContactProps, ContactValue>
