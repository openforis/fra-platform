import { Express } from 'express'
import { DescriptionCreate } from './create'
import { DescriptionGet } from './get'

export const DescriptionsApi = {
  init: (express: Express): void => {
    DescriptionGet.init(express)
    DescriptionCreate.init(express)
  },
}
