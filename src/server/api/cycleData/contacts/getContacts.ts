import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { NodeExtType } from 'meta/nodeExt'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getContacts = async (req: CycleDataRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, sectionName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const user = Requests.getUser(req)
    const props = { assessment, cycle, countryIso, sectionName, user, type: NodeExtType.contact }

    const contacts = await CycleDataController.Contacts.getMany(props)

    Requests.send(res, contacts)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
