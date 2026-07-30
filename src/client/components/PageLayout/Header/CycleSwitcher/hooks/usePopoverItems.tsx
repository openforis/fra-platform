import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Assessments } from 'meta/assessment/assessments'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { Users } from 'meta/user/users'

import { useAssessments } from 'client/store/meta/hooks/assessments'
import { useUser } from 'client/store/user/hooks/user'
import { useIsDataExportView } from 'client/hooks/dataExport'
import { useCycleRouteParams } from 'client/hooks/routeParams'
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

export const usePopoverItems = (): Array<PopoverItem> => {
  const { t } = useTranslation()
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
        sortedCycles.forEach((cycle) => {
          const hasRoleInAssessment = Users.hasRoleInAssessment({ user, assessment })
          const hasRoleInCycle = Users.hasRoleInCycle({ user, cycle })
          const canViewCycle = (hasRoleInAssessment && Cycles.isPublished(cycle)) || hasRoleInCycle

          const assessmentName = assessment.props.name
          const cycleName = t(Assessments.getCycleTranslationKey({ cycleName: cycle.name }))

          const isCurrentRoute = assessmentName === routeParams.assessmentName && cycle.name === routeParams.cycleName
          const content = t('common.cycleLabel', { assessmentName, cycleName })

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
  }, [assessments, isAdmin, isDataExportView, navigateTo, routeParams.assessmentName, routeParams.cycleName, t, user])
}
