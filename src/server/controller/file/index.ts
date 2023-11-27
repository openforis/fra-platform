import { AssessmentFileRepository } from 'server/repository/assessment/file'

import { createAssessmentFile } from './createAssessmentFile'
import { removeAssessmentFile } from './removeAssessmentFile'
import { updateManyAssessmentFileAccess } from './updateManyAssessmentFileAccess'

export const FileController = {
  createAssessmentFile,
  getAssessmentFile: AssessmentFileRepository.getOne,
  getAssessmentFiles: AssessmentFileRepository.getMany,
  removeAssessmentFile,
  getFileUsages: AssessmentFileRepository.getFileUsages,
  updateManyAssessmentFileAccess,
}
