import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentName, AssessmentNames } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useUser } from 'client/store/user'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import AssessmentSwitch from 'client/components/AssessmentSwitch'
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

const FraCycleComponents: { [key: AssessmentName]: React.FC } = {
  '2020': () => UserGuideLinkInner({ userGuideLinkOption: UserGuideLinkOption.File }),
  '2025': () => UserGuideLinkInner({ userGuideLinkOption: UserGuideLinkOption.TutorialPage }),
}

const FraUserGuideLinks: React.FC = () => {
  return <CycleSwitch components={FraCycleComponents} />
}

const AssessmentComponents: { [key: AssessmentName]: React.FC } = {
  [AssessmentNames.fra]: FraUserGuideLinks,
  [AssessmentNames.panEuropean]: null,
}

const UserGuideLink: React.FC = () => {
  const user = useUser()
  if (!user) return null

  return <AssessmentSwitch components={AssessmentComponents} />
}

export default UserGuideLink
