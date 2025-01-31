import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, DescriptionSectionValues } from 'meta/assessment'

import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{ name?: CommentableDescriptionName }>

export const getDescriptionsHistory = async (req: Request, res: Response) => {
  try {
    const { sectionName, countryIso } = req.query
    const values: { [key in CountryIso]?: DescriptionSectionValues } = {
      [countryIso]: {
        [sectionName]: {
          // Example of expected output:
          // dataSources: {
          //   text: '',
          //   dataSources: [],
          // },
          // generalComments: '',
          // nationalClassificationAndDefinitions: '',
          // originalData: '',
          // reclassification: '',
          // estimationAndForecasting: '',
          // introductoryText: '',
        },
      },
    }

    Requests.send(res, values)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
