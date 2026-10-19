import { Response } from 'express'

import { CycleRequest } from 'meta/api/request/cycle'
import { AreaCode } from 'meta/area/areaCode'
import { Link } from 'meta/cycleData/links/link'
import { Users } from 'meta/user/users'

import { LinksController } from 'server/controller/cycleData/links'
import Requests from 'server/utils/requests'

type Body = {
  link: Link
}

type Request = CycleRequest<{ countryIso?: AreaCode }, Body>

export const updateLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, country, cycle } = req.context
    const { countryIso } = country ?? {}
    const { link } = req.body

    const user = Requests.getUser(req)

    const props = { assessment, countryIso: Users.isAdministrator(user) ? undefined : countryIso, cycle, link, user }
    const updatedLink = await LinksController.update(props)

    Requests.send(res, updatedLink)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
