import { Objects } from 'utils/objects'

import { Contact } from 'meta/cycleData'

export const ContactAdapter = ({ permissions, ...contact }: any): Contact => {
  if (Objects.isEmpty(permissions) || permissions.sections === 'all') {
    // eslint-disable-next-line no-param-reassign
    contact.value.contributions = ['all']
  }

  if (permissions.sections === 'none') {
    // eslint-disable-next-line no-param-reassign
    contact.value.contributions = ['none']
  }

  if (!Objects.isEmpty(permissions?.sections) && typeof permissions?.sections !== 'string') {
    // eslint-disable-next-line no-param-reassign
    contact.value.contributions = Object.keys(permissions.sections)
  }

  // eslint-disable-next-line no-param-reassign
  contact.value.appellation = contact.value.appellation?.toLowerCase()

  return Objects.camelize(contact)
}
