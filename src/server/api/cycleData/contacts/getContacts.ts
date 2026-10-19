import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { NodeExtType } from 'meta/nodeExt/nodeExt'

import { ContactController } from 'server/controller/cycleData/contact'
import Requests from 'server/utils/requests'

export const getContacts = async (req: CycleDataRequest, res: Response): Promise<void> => {
  try {
    const user = Requests.getUser(req)
    const { assessment, cycle } = req.context
    const { countryIso, sectionName } = req.query
    const props = { assessment, cycle, countryIso, sectionName, user, type: NodeExtType.contact }

    const contacts = await ContactController.getMany(props)

    Requests.send(res, contacts)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
