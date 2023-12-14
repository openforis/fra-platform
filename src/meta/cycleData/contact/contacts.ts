import { CountryIso } from 'meta/area'
import { Cycle } from 'meta/assessment'
import { User, Users } from 'meta/user'

import { Contact, ContactValue } from './contact'

const placeholder: Contact = {
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
} as Contact

const addPlaceholder = (contacts: Array<Contact>) => {
  return [...contacts, placeholder]
}

const removePlaceholder = (contacts: Array<Contact>) => {
  return contacts.filter((contact) => contact.uuid)
}

const fromUser = (props: { countryIso: CountryIso; cycle: Cycle; user: User }): Contact => {
  const { countryIso, cycle, user } = props
  const userRole = Users.getRole(user, countryIso, cycle)

  const { uuid } = user
  const { name, surname, title: _appellation } = user.props
  // TODO: Migration step to fix user.props.appellation
  const appellation = _appellation?.toLowerCase()
  const institution = userRole?.props?.organization
  const role = userRole?.role as ContactValue['role']
  const contributions = Users.getUserSections({ user, cycle, countryIso })

  const _props = { readOnly: true }
  const value = { role, appellation, name, surname, institution, contributions }

  return { uuid, countryIso, props: _props, value }
}

export const Contacts = {
  addPlaceholder,
  fromUser,
  removePlaceholder,
}
