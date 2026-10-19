import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { NodeValue } from 'meta/assessment/node'
import { Contact } from 'meta/cycleData/contact/contact'
import { ContactField } from 'meta/cycleData/contact/field'

import { ContactController } from 'server/controller/cycleData/contact'
import Requests from 'server/utils/requests'

type Body = {
  contact: Contact
  field: ContactField
  raw: NodeValue['raw']
}

export const updateContact = async (req: CycleDataRequest<never, Body>, res: Response): Promise<void> => {
  try {
    const user = Requests.getUser(req)
    const { assessment, cycle } = req.context
    const { contact, field, raw } = req.body
    const { countryIso, sectionName } = req.query

    const props = { assessment, cycle, countryIso, sectionName, user, nodeExt: contact[field], raw }
    const updatedContact = await ContactController.update(props)

    Requests.send(res, updatedContact)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
