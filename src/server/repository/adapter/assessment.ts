import { Objects } from 'utils/objects'

import { Assessment, AssessmentProps } from 'meta/assessment/assessment'
import { AssessmentMetaCache } from 'meta/assessment/metaCache'

interface AssessmentDB {
  id: number
  uuid: string
  props: AssessmentProps
  meta_cache: AssessmentMetaCache
}

export const AssessmentAdapter = (assessment: AssessmentDB): Assessment => {
  return { ...Objects.camelize(assessment), metaCache: assessment.meta_cache }
}
