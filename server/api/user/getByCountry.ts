import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { RoleName } from '@meta/user'

import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const getByCountry = async (req: Request, res: Response) => {
  const { countryIso } = req.params as { countryIso: CountryIso }

  try {
    const users = await UserController.readCountryUsersByRole({
      countryISOs: [countryIso],
      roles: [RoleName.COLLABORATOR],
    })

    res.send({ users })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
