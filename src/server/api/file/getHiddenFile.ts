import { Request, Response } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentName } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { Requests } from 'server/utils'

type GetPrivateFileRequest = Request<never, never, never, { assessmentName: AssessmentName; fileName: string }>

/**
 * @deprecated - Function left as redirect
 * @description - Get a hidden file. All hidden files refer to cycle 2025 when using this endpoint.
 * Previous implementation expected hidden file to be defined as file.props.hidden = true
 * We use repository to handle files, file.props.hidden is moved to repositoryItem.props.hidden
 * @param req - Request
 * @param res - Response
 * @returns void
 */
export const getHiddenFile = async (req: GetPrivateFileRequest, res: Response) => {
  try {
    const { assessmentName, fileName } = req.query
    const cycleName = '2025'
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const repositoryItem = await CycleDataController.Repository.getOne({ assessment, cycle, fileName })
    const urlParams = new URLSearchParams({ assessmentName, cycleName })
    res
      .status(301)
      .redirect(`${ApiEndPoint.CycleData.Repository.File.one(repositoryItem.uuid)}?${urlParams.toString()}`)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
