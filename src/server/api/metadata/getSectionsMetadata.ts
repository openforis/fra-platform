import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import Requests from 'server/utils/requests'

export const getSectionsMetadata = async (req: CycleRequest<{ sectionNames: Array<string> }>, res: Response) => {
  try {
    const { assessmentName, sectionNames, cycleName } = req.query
    const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const tablesMetadata = await MetadataController.getSectionsMetadata({ assessment, cycle, sectionNames })

    Requests.send(res, tablesMetadata)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
