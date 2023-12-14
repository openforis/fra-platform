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

export const Contacts = {
  addPlaceholder,
  removePlaceholder,
}
