import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { MetadataController } from 'server/controller/metadata'
import Requests from 'server/utils/requests'

export const getSectionsMetadata = async (
  req: CountryRequest<{ sectionNames: Array<string> }>,
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
