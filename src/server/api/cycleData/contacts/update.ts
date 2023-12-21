import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { NodeValue } from 'meta/assessment'
import { Contact, ContactField } from 'meta/cycleData'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Body = {
  contact: Contact
  field: ContactField
  raw: NodeValue['raw']
}

export const updateContact = async (req: CycleDataRequest<never, Body>, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, sectionName } = req.query
    const { contact, field, raw } = req.body

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const user = Requests.getUser(req)

    const props = { assessment, cycle, countryIso, sectionName, user, nodeExt: contact[field], raw }
    const createdContact = await CycleDataController.Contacts.update(props)

    Requests.send(res, createdContact)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
