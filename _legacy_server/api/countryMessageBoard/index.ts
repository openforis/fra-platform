import { Express } from 'express'
import { CountryMessageBoardGetAll } from './getAll'
import { CountryMessageBoardGet } from './get'
import { CountryMessageBoardCreate } from './create'

export const CountryMessageBoardApi = {
  init: (express: Express): void => {
    CountryMessageBoardGetAll.init(express)
    CountryMessageBoardGet.init(express)
    CountryMessageBoardCreate.init(express)
  },
}
