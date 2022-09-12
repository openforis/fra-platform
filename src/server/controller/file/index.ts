import { AssessmentFileRepository } from '@server/repository/assessment/file'

import { createAssessmentFile } from './createAssessmentFile'

export const FileController = {
  createAssessmentFile,
  getAssessmentFile: AssessmentFileRepository.getOne,
  getAssessmentFiles: AssessmentFileRepository.getMany,
  removeAssessmentFile: AssessmentFileRepository.remove,
}
