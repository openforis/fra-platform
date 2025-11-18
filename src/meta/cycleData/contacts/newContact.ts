import { CountryIso } from 'meta/area/countryIso'
import { Contact } from 'meta/cycleData/contact/contact'
import { ContactField } from 'meta/cycleData/contact/field'
import { newContactNode } from 'meta/cycleData/contacts/newContactNode'
import { NodeExtType } from 'meta/nodeExt/nodeExt'
import { UUIDs } from 'meta/uuid'

type Props = {
  countryIso: CountryIso
  rowIndex: number
}

export const newContact = (props: Props): Contact => {
  const { countryIso, rowIndex } = props

  const uuid = UUIDs.getUuid()

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
