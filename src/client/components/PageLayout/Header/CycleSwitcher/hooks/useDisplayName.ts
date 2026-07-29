import { useTranslation } from 'react-i18next'

import { AssessmentNames } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleNames } from 'meta/assessment/cycle/names'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycleRouteParams } from 'client/hooks/routeParams'

export const useDisplayName = (): string => {
  const assessment = useAssessment()
  const { cycleName } = useCycleRouteParams()

  const { t } = useTranslation()

  const { name: assessmentName } = assessment.props

  // Hide header cycle name for panEuropean last created cycle
  const isPanEuropean = assessmentName === AssessmentNames.panEuropean
  const isLastCreatedCycle = Assessments.getLastCreatedCycle(assessment).name === cycleName
  if (isPanEuropean && isLastCreatedCycle) {
    return ''
  }

  // TODO: NOTE: This logic is subject to change when we merge latest2 to latest
  // Hide header cycle name for fra cycle named 'latest', show 'in Progress' for 'latest2'
  const isFra = assessmentName === AssessmentNames.fra
  if (isFra) {
    if (cycleName === CycleNames.latest) return ''
    if (cycleName === CycleNames.latest2) return t('common.inProgress')
  }

  return cycleName
}
