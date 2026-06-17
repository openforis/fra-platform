import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { DescriptionController } from 'server/controller/cycleData/description'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{ name?: CommentableDescriptionName }>

export const getDescription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso, name, sectionName } = req.query

    const names = Objects.isNil(name) ? undefined : [name]
    const sectionNames = Objects.isNil(sectionName) ? undefined : [sectionName]

    const propsValues = { assessment, countryISOs: [countryIso], cycle, names, sectionNames }
    const values = await DescriptionController.getValues(propsValues)

    Requests.send(res, values)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
