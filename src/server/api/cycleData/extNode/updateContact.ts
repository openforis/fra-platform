import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { Contact } from 'meta/contact'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const updateContact = async (req: CycleDataRequest<never, { contact: Contact }>, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, sectionName } = req.query
    const { contact } = req.body

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const user = Requests.getUser(req)
    const props = { assessment, cycle, countryIso, sectionName, user, contact }
    const updatedContact = await CycleDataController.updateContact(props)

    Requests.send(res, updatedContact)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
