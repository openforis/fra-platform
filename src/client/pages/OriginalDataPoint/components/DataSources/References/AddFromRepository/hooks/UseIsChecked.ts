import { useCallback } from 'react'

import { AssessmentFile } from 'meta/cycleData'

export const useIsChecked = (selectedFiles: Array<AssessmentFile>) =>
  useCallback((uuid: string) => selectedFiles.some((selectedFile) => selectedFile.uuid === uuid), [selectedFiles])
