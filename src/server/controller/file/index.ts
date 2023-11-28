import { AssessmentFileRepository } from 'server/repository/assessment/file'

import { createAssessmentFile } from './createAssessmentFile'
import { getAssessmentFile } from './getAssessmentFile'
import { removeAssessmentFile } from './removeAssessmentFile'
import { updateManyAssessmentFileAccess } from './updateManyAssessmentFileAccess'

export const FileController = {
  createAssessmentFile,
  getAssessmentFile,
  getAssessmentFiles: AssessmentFileRepository.getMany,
  removeAssessmentFile,
  getFileUsages: AssessmentFileRepository.getFileUsages,
  getHiddenAssessmentFile: AssessmentFileRepository.getOne,
  updateManyAssessmentFileAccess,
}
