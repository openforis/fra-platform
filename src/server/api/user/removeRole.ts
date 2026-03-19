import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const removeRole = async (req: CountryRequest<{ userUuid: string }>, res: Response): Promise<void> => {
  try {
    const user = Requests.getUser(req)
    const { userUuid } = req.query
    const { assessment, country, cycle } = req.context

    const target = await UserController.getOne({ uuid: userUuid, allowDisabled: true })
    await UserController.removeRole({ assessment, countryIso: country.countryIso, cycle, target, user })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
