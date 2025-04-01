import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TFunction } from 'i18next'

import { Assessments } from 'meta/assessment/assessments'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { Lang } from 'meta/lang'
import { Users } from 'meta/user'

import { useAssessments } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useIsDataExportView } from 'client/hooks'
import { useLanguage } from 'client/hooks/useLanguage'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import { PopoverItem } from 'client/components/PopoverControl'

import { useNavigateTo } from './useNavigateTo'

const _cyclesSorter = (cycleA: Cycle, cycleB: Cycle): number => {
  const dateEditingA = cycleA.props.dateEditing
  const dateEditingB = cycleB.props.dateEditing
  if (dateEditingA && dateEditingB) {
    return new Date(dateEditingB).getTime() - new Date(dateEditingA).getTime()
  }

  const dateCreatedA = cycleA.props.dateCreated
  const dateCreatedB = cycleB.props.dateCreated
  if (dateCreatedA && dateCreatedB) {
    return new Date(dateCreatedB).getTime() - new Date(dateCreatedA).getTime()
  }
  if (dateCreatedA) {
    return -1
  }
  if (dateCreatedB) {
    return 1
  }
  return 0
}

const _getContent = (
  cycleName: string,
  isLatestCycle: boolean,
  label: string,
  language: Lang,
  t: TFunction
): string => {
  if (language === Lang.ru) {
    return isLatestCycle ? `${t('common.latest')} ${label}` : `${label}–${cycleName}`
  }
  return `${label} ${isLatestCycle ? t('common.latest') : cycleName}`
}

export const usePopoverItems = (): Array<PopoverItem> => {
  const { t } = useTranslation()
  const language = useLanguage()
  const routeParams = useCycleRouteParams()
  const assessments = useAssessments()
  const user = useUser()
  const isAdmin = Users.isAdministrator(user)

  const isDataExportView = useIsDataExportView()
  const navigateTo = useNavigateTo()

  return useMemo<Array<PopoverItem>>(() => {
    const items: Array<PopoverItem> = []

    if ((isAdmin || !isDataExportView) && user) {
      assessments.forEach((assessment) => {
        const sortedCycles = assessment.cycles.slice().sort(_cyclesSorter)
        sortedCycles.forEach((cycle: Cycle) => {
          const hasRoleInAssessment = Users.hasRoleInAssessment({ user, assessment })
          const hasRoleInCycle = Users.hasRoleInCycle({ user, cycle })
          const canViewCycle = (hasRoleInAssessment && Cycles.isPublished(cycle)) || hasRoleInCycle

          const assessmentName = assessment.props.name
          const cycleName = cycle.name
          const isLatestCycle = Assessments.getLastCreatedCycle(assessment)?.name === cycleName
          const isCurrentRoute = assessmentName === routeParams.assessmentName && cycleName === routeParams.cycleName
          const label = t(`${assessmentName}.labels.short`)
          const content = _getContent(cycleName, isLatestCycle, label, language, t)

          if (canViewCycle && !isCurrentRoute) {
            const item: PopoverItem = {
              content,
              onClick: () => navigateTo({ assessment, cycle, user }),
            }
            items.push(item)
          }
        })
      })
    }

    return items
  }, [
    assessments,
    isAdmin,
    isDataExportView,
    language,
    navigateTo,
    routeParams.assessmentName,
    routeParams.cycleName,
    t,
    user,
  ])
}
