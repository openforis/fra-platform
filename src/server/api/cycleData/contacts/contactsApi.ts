import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { createContact } from 'server/api/cycleData/contacts/create'
import { getContacts } from 'server/api/cycleData/contacts/getContacts'
import { removeContact } from 'server/api/cycleData/contacts/remove'
import { updateContact } from 'server/api/cycleData/contacts/update'
import { AuthMiddleware } from 'server/middleware/auth'

export const ContactsApi = {
  init: (express: Express): void => {
    express.post(ApiEndPoint.CycleData.Contacts.one(), AuthMiddleware.requireEditDescriptions, createContact)
    express.get(ApiEndPoint.CycleData.Contacts.many(), AuthMiddleware.requireView, getContacts)
    express.put(ApiEndPoint.CycleData.Contacts.one(), AuthMiddleware.requireEditDescriptions, updateContact)
    express.delete(ApiEndPoint.CycleData.Contacts.one(), AuthMiddleware.requireEditDescriptions, removeContact)
  },
}
