import { getFieldValue } from 'meta/cycleData/contacts/getFieldValue'
import { newContact } from 'meta/cycleData/contacts/newContact'
import { RoleName, UserTitle } from 'meta/user'

const allowedRoles = [RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, RoleName.COLLABORATOR]

const appellations = Object.values(UserTitle)

export const Contacts = {
  appellations,
  allowedRoles,
  getFieldValue,
  newContact,
}
