import { RoleName, UserTitle } from 'meta/user'

import { Contact } from './contact'

const placeholder: Contact = {
  countryIso: undefined,
  uuid: undefined,
  props: {
    rowIndex: -1,
    readOnly: false,
  },
  value: {
    appellation: '',
    contributions: [],
    institution: '',
    name: '',
    role: undefined,
    surname: '',
  },
}

const allowedRoles = [RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, RoleName.COLLABORATOR]
const appellations = Object.values(UserTitle)

export const Contacts = {
  appellations,
  allowedRoles,
  placeholder,
}
