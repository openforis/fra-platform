import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { MetadataController } from 'server/controller/metadata'
import Requests from 'server/utils/requests'

export const getSectionsMetadata = async (
  req: CycleRequest<{ sectionNames: Array<string> }>,
  res: Response
): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { sectionNames } = req.query

    const tablesMetadata = await MetadataController.getSectionsMetadata({ assessment, cycle, sectionNames })

    Requests.send(res, tablesMetadata)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
