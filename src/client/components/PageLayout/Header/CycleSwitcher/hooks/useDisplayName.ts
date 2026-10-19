import { useTranslation } from 'react-i18next'

import { Assessments } from 'meta/assessment/assessments'
import { CycleNames } from 'meta/assessment/cycle/names'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycleRouteParams } from 'client/hooks/routeParams'

export const useDisplayName = (): string => {
  const assessment = useAssessment()
  const { cycleName } = useCycleRouteParams()

  const { t } = useTranslation()

  const isLastCreatedCycle = Assessments.getLastCreatedCycle(assessment).name === cycleName

  if (cycleName === CycleNames.latest2) return t('common.inProgress')
  if (cycleName === CycleNames.latest || isLastCreatedCycle) return ''

  return cycleName
}
