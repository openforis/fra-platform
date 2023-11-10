import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const removeContact = async (req: CycleDataRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, sectionName, uuid } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const user = Requests.getUser(req)
    const props = { assessment, cycle, countryIso, sectionName, user, uuid }
    const removedContact = await CycleDataController.removeContact(props)

    Requests.send(res, removedContact)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
