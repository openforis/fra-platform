import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { Contact } from 'meta/cycleData/contact/contact'

import { ContactController } from 'server/controller/cycleData/contact'
import Requests from 'server/utils/requests'

type Body = {
  contact: Contact
}

export const createContact = async (req: CycleDataRequest<never, Body>, res: Response): Promise<void> => {
  try {
    const user = Requests.getUser(req)
    const { assessment, cycle } = req.context
    const { contact } = req.body
    const { countryIso, sectionName } = req.query

    const props = { assessment, cycle, countryIso, sectionName, user, contact }
    const createdContact = await ContactController.create(props)

    Requests.send(res, createdContact)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
