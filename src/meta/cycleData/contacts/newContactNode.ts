import { CountryIso } from 'meta/area/countryIso'
import { NodeValue } from 'meta/assessment/node'
import { ContactField } from 'meta/cycleData/contact/field'
import { ContactNode } from 'meta/cycleData/contact/node'
import { NodeExtType } from 'meta/nodeExt/nodeExt'
import { UUIDs } from 'meta/uuid/uuids'

type Props = {
  countryIso: CountryIso
  field: ContactField
  parentUuid: string
  raw: NodeValue['raw']
}

export const newContactNode = (props: Props): ContactNode => {
  const { countryIso, field, parentUuid, raw } = props
  const uuid = UUIDs.getUuid()

  return {
    countryIso,
    parentUuid,
    props: { field },
    type: NodeExtType.contact,
    uuid,
    value: { raw },
  }
}
