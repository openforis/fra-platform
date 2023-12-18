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

const addPlaceholder = (contacts: Array<Contact>) => {
  return [...contacts, placeholder]
}

const removePlaceholder = (contacts: Array<Contact>) => {
  return contacts.filter((contact) => contact.uuid)
}

const allowedRoles = [RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, RoleName.COLLABORATOR]

const appellations = Object.values(UserTitle)

export const Contacts = {
  appellations,
  allowedRoles,
  addPlaceholder,
  removePlaceholder,
}
