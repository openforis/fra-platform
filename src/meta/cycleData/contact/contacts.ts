import { Contact, ContactProps, ContactValue } from './contact'

const initialProps: ContactProps = {
  rowIndex: -1,
  readOnly: false,
}

const initialValue: ContactValue = {
  appellation: '',
  contributions: [],
  institution: '',
  name: '',
  role: undefined,
  surname: '',
}

const addPlaceholder = (contacts: Array<Contact>) => {
  const placeholder: Contact = { props: initialProps, value: initialValue } as Contact
  return [...contacts, placeholder]
}

const removePlaceholder = (contacts: Array<Contact>) => {
  return contacts.filter((contact) => contact.uuid)
}

export const Contacts = {
  addPlaceholder,
  removePlaceholder,
}
