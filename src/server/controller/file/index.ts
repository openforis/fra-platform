import { AssessmentFileRepository } from '@server/repository/assessment/file'

export const FileController = {
  getAssessmentFile: AssessmentFileRepository.getOne,
  getAssessmentFiles: AssessmentFileRepository.getMany,
  removeAssessmentFile: AssessmentFileRepository.remove,
}
