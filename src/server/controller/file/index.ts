import { createMany } from 'server/controller/file/createMany'
import { AssessmentFileRepository } from 'server/repository/assessment/file'

import { createAssessmentFile } from './createAssessmentFile'
import { getAssessmentFile } from './getAssessmentFile'
import { removeAssessmentFile } from './removeAssessmentFile'
import { updateManyAssessmentFileAccess } from './updateManyAssessmentFileAccess'

export const FileController = {
  createMany,

  createAssessmentFile,
  getAssessmentFile,
  /**
   * @Deprecated
   */
  getAssessmentFiles: AssessmentFileRepository.getMany,
  removeAssessmentFile,
  /**
   * @Deprecated
   */
  getFileUsages: AssessmentFileRepository.getFileUsages,
  /**
   * @Deprecated
   */
  getHiddenAssessmentFile: AssessmentFileRepository.getOne,
  updateManyAssessmentFileAccess,
}
