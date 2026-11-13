import { Contact, ContactProps } from 'meta/cycleData/contact/contact'
import { NodeExt } from 'meta/nodeExt/nodeExt'
import { Objects } from 'utils/objects'

// contact row only, without its child nodes
export const getContactRow = (contact: Contact): NodeExt<ContactProps, null> =>
  Objects.pick(contact, ['countryIso', 'parentUuid', 'props', 'type', 'uuid', 'value'])
