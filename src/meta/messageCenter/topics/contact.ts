import { Contact } from 'meta/cycleData/contact/contact'

export const getContactKey = (contact: Contact): string => `contact_${contact.uuid}`
