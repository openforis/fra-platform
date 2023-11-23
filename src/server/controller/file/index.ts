import { AssessmentFileRepository } from 'server/repository/assessment/file'

import { createAssessmentFile } from './createAssessmentFile'
import { removeAssessmentFile } from './removeAssessmentFile'

export const FileController = {
  createAssessmentFile,
  getAssessmentFile: AssessmentFileRepository.getOne,
  getAssessmentFiles: AssessmentFileRepository.getMany,
  removeAssessmentFile,
  getFileUsages: AssessmentFileRepository.getFileUsages,
}
