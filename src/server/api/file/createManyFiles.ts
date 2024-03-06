import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { FileController } from 'server/controller/file'
import { Requests } from 'server/utils'

type Request = CycleRequest & {
  files: Array<Express.Multer.File>
}

export const createManyFiles = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query
    const { files } = req

    const user = Requests.getUser(req)
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const createProps = { assessment, cycle, files, user }
    const createdFiles = await FileController.createMany(createProps)

    Requests.sendOk(res, createdFiles)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
