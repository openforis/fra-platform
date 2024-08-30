import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { Lang } from 'meta/lang'

import { FileRepository, fileTypes } from 'server/service/file_deprecated'
import { Requests } from 'server/utils'

type Request = CycleDataRequest<{ key: 'Metadata-15-01-01' | 'Metadata-15-02-01' }>

export const getSdgMetadata = async (req: Request, res: Response) => {
  try {
    const { key } = req.query
    FileRepository.download(res, fileTypes.sdgMetadata(key), Lang.en)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
