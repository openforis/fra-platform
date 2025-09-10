import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { FileController } from 'server/controller/file'
import { Requests } from 'server/utils'

type Request = CycleRequest & {
  files: Array<Express.Multer.File>
}

export const createManyFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = Requests.getUser(req)
    const { assessment, cycle } = req.context
    const { files } = req

    const createProps = { assessment, cycle, files, user }
    const createdFiles = await FileController.createMany(createProps)

    Requests.sendOk(res, createdFiles)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
