import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { createContact } from 'server/api/extNode/createContact'

export const NodeExtApi = {
  init: (express: Express): void => {
    // Contacts
    express.post(
      ApiEndPoint.NodeExt.contacts(),
      // AuthMiddleware.requireEditTableData,
      createContact
    )
  },
}
