import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentNames } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useUser } from 'client/store/user'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useFooterLogic = () => {
  const { i18n } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const user = useUser()
  const { language } = i18n
  const { print } = useIsPrintRoute()

  const isFra2020 = assessmentName === AssessmentNames.fra && cycleName === '2020'
  const isFra2025 = assessmentName === AssessmentNames.fra && cycleName === '2025'
  const isPanEuropean2020 = assessmentName === AssessmentNames.panEuropean && cycleName === '2020'
  const isPanEuropean2025 = assessmentName === AssessmentNames.panEuropean && cycleName === '2025'

  const isUserGuideLinkVisible = useMemo(
    () => user && !isPanEuropean2020 && !isPanEuropean2025,
    [user, isPanEuropean2020, isPanEuropean2025]
  )

  const userGuideLink = useMemo(() => {
    return isFra2025
      ? Routes.Tutorials.generatePath({ assessmentName, cycleName })
      : `${ApiEndPoint.File.userGuide(language)}`
  }, [isFra2025, assessmentName, cycleName, language])

  const isTutorialLinkVisible = useMemo(
    () => !isFra2020 && !isFra2025 && !isPanEuropean2020 && !isPanEuropean2025,
    [isFra2020, isFra2025, isPanEuropean2020, isPanEuropean2025]
  )

  const isFooterVisible = useMemo(() => !print && cycleName && assessmentName, [print, cycleName, assessmentName])

  return {
    isUserGuideLinkVisible,
    isTutorialLinkVisible,
    userGuideLink,
    isFooterVisible,
  }
}
