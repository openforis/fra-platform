import { NodeValue } from 'meta/assessment/node'
import { Contact } from 'meta/cycleData/contact/contact'
import { ContactField } from 'meta/cycleData/contact/field'

type Props = {
  contact: Contact
  field: ContactField
}

export const getFieldValue = (props: Props): NodeValue['raw'] => {
  const { contact, field } = props
  return contact[field].value.raw
}
