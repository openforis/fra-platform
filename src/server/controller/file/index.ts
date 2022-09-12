import { AssessmentFileRepository } from '@server/repository/assessment/file'

import { createFile } from './createFile'

export const FileController = {
  createFile,
  getAssessmentFile: AssessmentFileRepository.getOne,
  getAssessmentFiles: AssessmentFileRepository.getMany,
  removeAssessmentFile: AssessmentFileRepository.remove,
}
