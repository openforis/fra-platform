import { UUIDs } from 'utils/uuids'

import { CountryIso } from 'meta/area'
import { NodeValue } from 'meta/assessment'
import { NodeExtType } from 'meta/nodeExt'
import { RoleName, UserTitle } from 'meta/user'

import { Contact, ContactField, ContactNode } from './contact'

const newContactNode = (props: {
  countryIso: CountryIso
  field: ContactField
  parentUuid: string
  raw: NodeValue['raw']
}): ContactNode => {
  const { countryIso, field, parentUuid, raw } = props
  const uuid = UUIDs.v4()
  return {
    countryIso,
    parentUuid,
    props: { field },
    type: NodeExtType.contact,
    uuid,
    value: { raw },
  }
}

const newContact = (props: { countryIso: CountryIso; rowIndex: number }): Contact => {
  const { countryIso, rowIndex } = props

  const uuid = UUIDs.v4()

  return {
    [ContactField.appellation]: newContactNode({
      countryIso,
      field: ContactField.appellation,
      parentUuid: uuid,
      raw: '',
    }),
    [ContactField.contributions]: newContactNode({
      countryIso,
      field: ContactField.contributions,
      parentUuid: uuid,
      raw: [],
    }),
    [ContactField.institution]: newContactNode({
      countryIso,
      field: ContactField.institution,
      parentUuid: uuid,
      raw: '',
    }),
    [ContactField.name]: newContactNode({ countryIso, field: ContactField.name, parentUuid: uuid, raw: '' }),
    [ContactField.role]: newContactNode({ countryIso, field: ContactField.role, parentUuid: uuid, raw: null }),
    [ContactField.surname]: newContactNode({ countryIso, field: ContactField.surname, parentUuid: uuid, raw: '' }),
    countryIso: props.countryIso,
    parentUuid: null,
    props: { rowIndex },
    type: NodeExtType.contact,
    uuid,
    value: null,
  }
}

const allowedRoles = [RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, RoleName.COLLABORATOR]

const appellations = Object.values(UserTitle)

const getFieldValue = (props: { contact: Contact; field: ContactField }): NodeValue['raw'] => {
  const { contact, field } = props
  return contact[field].value.raw
}

export const Contacts = {
  appellations,
  allowedRoles,
  getFieldValue,
  newContact,
}
