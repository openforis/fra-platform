import { Request, Response } from 'express'

import { HealthController } from 'server/controller/health'
import { HealthStatus } from 'server/controller/health/getHealth'
import Requests from 'server/utils/requests'

export const getHealth = async (_req: Request, res: Response): Promise<void> => {
  try {
    const health = await HealthController.getHealth()

    if (health.status === HealthStatus.ok) {
      Requests.sendOk(res, health)
      return
    }

    res.status(503).json(health)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
