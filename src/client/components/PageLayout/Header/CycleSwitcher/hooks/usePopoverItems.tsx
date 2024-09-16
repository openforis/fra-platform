import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CycleStatus } from 'meta/assessment'
import { Users } from 'meta/user'

import { useAssessments } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useIsDataExportView } from 'client/hooks'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import { PopoverItem } from 'client/components/PopoverControl'

import { useNavigateTo } from './useNavigateTo'

export const usePopoverItems = (): Array<PopoverItem> => {
  const { t } = useTranslation()
  const routeParams = useCycleRouteParams()
  const assessments = useAssessments()
  const user = useUser()

  const isDataExportView = useIsDataExportView()
  const navigateTo = useNavigateTo()

  return useMemo<Array<PopoverItem>>(() => {
    const items: Array<PopoverItem> = []

    if (!isDataExportView && user) {
      assessments.forEach((assessment) => {
        assessment.cycles.forEach((cycle) => {
          const hasRoleInAssessment = Users.hasRoleInAssessment({ user, assessment })
          const hasRoleInCycle = Users.hasRoleInCycle({ user, cycle })
          const canViewCycle = (hasRoleInAssessment && cycle.props.status === CycleStatus.published) || hasRoleInCycle

          const assessmentName = assessment.props.name
          const cycleName = cycle.name
          const isCurrentRoute = assessmentName === routeParams.assessmentName && cycleName === routeParams.cycleName

          if (canViewCycle && !isCurrentRoute) {
            const item: PopoverItem = {
              content: `${t(`${assessmentName}.labels.short`)} ${cycleName}`,
              onClick: () => navigateTo({ assessment, cycle, user }),
            }
            items.push(item)
          }
        })
      })
    }

    return items
  }, [assessments, isDataExportView, navigateTo, routeParams.assessmentName, routeParams.cycleName, t, user])
}
