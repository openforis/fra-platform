import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { FileController } from 'server/controller/file'
import { Requests } from 'server/utils'

type Request = CycleRequest & {
  uuid: string
}

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, uuid } = req.query
    const user = Requests.getUser(req)
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    await FileController.deleteOne({ assessment, cycle, uuid, user })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
