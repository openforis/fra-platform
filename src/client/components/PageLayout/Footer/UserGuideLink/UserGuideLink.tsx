import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentNames } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useUser } from 'client/store/user'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import CycleSwitch from 'client/components/CycleSwitch'

enum UserGuideLinkOption {
  TutorialPage = 'tutorialPage',
  File = 'file',
}

type Props = {
  userGuideLinkOption: UserGuideLinkOption
}

const UserGuideLinkInner: React.FC<Props> = (props) => {
  const { userGuideLinkOption } = props

  const { i18n, t } = useTranslation()
  const { language } = i18n
  const { assessmentName, cycleName } = useCycleRouteParams()

  const userGuideLink = useMemo(() => {
    switch (userGuideLinkOption) {
      case UserGuideLinkOption.TutorialPage:
        return Routes.Tutorials.generatePath({ assessmentName, cycleName })
      case UserGuideLinkOption.File:
        return ApiEndPoint.File.userGuide(language)
      default:
        return ''
    }
  }, [userGuideLinkOption, assessmentName, cycleName, language])

  return (
    <>
      <div className="separator" />
      <a target="_top" href={userGuideLink}>
        {t('footer.userGuide')}
      </a>
    </>
  )
}

const UserGuideLinkComponents = {
  [AssessmentNames.fra]: {
    '2020': () => UserGuideLinkInner({ userGuideLinkOption: UserGuideLinkOption.File }),
    '2025': () => UserGuideLinkInner({ userGuideLinkOption: UserGuideLinkOption.TutorialPage }),
  },
}

const UserGuideLink: React.FC = () => {
  const user = useUser()
  if (!user) return null

  return <CycleSwitch components={UserGuideLinkComponents} />
}

export default UserGuideLink
