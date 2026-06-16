import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'

import { DescriptionController } from 'server/controller/cycleData/description'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{ name: CommentableDescriptionName }, { value: CommentableDescriptionValue }>

export const upsertDescription = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = Requests.getUser(req)
    const { assessment, cycle } = req.context
    const { country } = req.context
    const { name, sectionName } = req.query
    const { value } = req.body

    const propsUpsert = { assessment, cycle, country, sectionName, name, value, user }
    const description = await DescriptionController.upsertDescription(propsUpsert)

    Requests.send(res, description)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
