import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { Contact } from 'meta/cycleData'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Body = {
  contact: Contact
}

export const createContact = async (req: CycleDataRequest<never, Body>, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, sectionName } = req.query
    const { contact } = req.body

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const user = Requests.getUser(req)

    const props = { assessment, cycle, countryIso, sectionName, user, contact }
    const createdContact = await CycleDataController.Contacts.create(props)

    Requests.send(res, createdContact)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
