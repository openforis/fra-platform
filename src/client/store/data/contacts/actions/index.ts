import { createContact } from 'client/store/data/contacts/actions/createContact'
import { deleteContact } from 'client/store/data/contacts/actions/deleteContact'
import { getContacts } from 'client/store/data/contacts/actions/getContacts'
import { updateContact } from 'client/store/data/contacts/actions/updateContact'

export const ContactsActions = {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
}
