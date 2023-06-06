import { Objects } from 'utils/objects'

import { Assessment, AssessmentMetaCache, AssessmentProps } from 'meta/assessment'

interface AssessmentDB {
  id: number
  uuid: string
  props: AssessmentProps
  meta_cache: AssessmentMetaCache
}

export const AssessmentAdapter = (assessment: AssessmentDB): Assessment => {
  return { ...Objects.camelize(assessment), metaCache: assessment.meta_cache }
}
