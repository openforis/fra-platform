import { Request, Response } from 'express'

import { AssessmentName } from 'meta/assessment'

import { Requests } from 'server/utils'

type GetPrivateFileRequest = Request<never, never, never, { assessmentName: AssessmentName; fileName: string }>

// export const getHiddenFile = async (req: GetPrivateFileRequest, res: Response) => {
// @ts-ignore
export const getHiddenFile = async (_: GetPrivateFileRequest, res: Response) => {
  try {
    // const { assessmentName, fileName } = req.query

    // const assessment = await AssessmentController.getOne({ assessmentName })
    // TODO
    // const assessmentFile = await FileController.getHiddenAssessmentFile({ assessment, fileName })
    // Responses.sendAssessmentFile(res, assessmentFile)
    Requests.sendOk(res)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
