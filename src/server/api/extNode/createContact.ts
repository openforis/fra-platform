import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { Contact } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { NodeExtController } from 'server/controller/nodeExt'
import Requests from 'server/utils/requests'

export const createContact = async (req: CycleDataRequest<never, { contact: Contact }>, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, sectionName } = req.query
    const { contact } = req.body

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const props = {
      assessment,
      cycle,
      countryIso,
      sectionName,
      user: Requests.getUser(req),

      contact,
    }

    const _contact = await NodeExtController.createContact(props)

    Requests.send(res, _contact)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
