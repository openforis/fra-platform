import { SectionName } from 'meta/assessment'
import { NodeExt } from 'meta/nodeExt'
import { RoleName } from 'meta/user/userRole'

export interface ContactProps {
  index: number
  role: RoleName.NATIONAL_CORRESPONDENT | RoleName.ALTERNATE_NATIONAL_CORRESPONDENT | RoleName.COLLABORATOR
  appellation: string
  name: string
  surname: string
  institution: string
  contributions: Array<SectionName>
  readOnly?: boolean
}

export type Contact = NodeExt<ContactProps>
