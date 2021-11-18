import { Express } from 'express'
import { CollaboratorCreate } from '@server/api/collaborators/create'

export const CollaboratorsApi = {
  init: (express: Express): void => {
    CollaboratorCreate.init(express)
  },
}
