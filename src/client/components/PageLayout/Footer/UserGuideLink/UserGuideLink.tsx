import React, { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentNames } from 'meta/assessment/assessment'
import { Files } from 'meta/file/files'
import { Routes } from 'meta/routes'

import { useUser } from 'client/store/user/hooks/user'
import { useLanguage } from 'client/hooks/language'
import { useCycleRouteParams } from 'client/hooks/routeParams'
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

  const { t } = useTranslation()
  const language = useLanguage()

  const { assessmentName, cycleName } = useCycleRouteParams()

  const userGuideLink = useMemo(() => {
    switch (userGuideLinkOption) {
      case UserGuideLinkOption.TutorialPage:
        return Routes.Tutorials.generatePath({ assessmentName, cycleName })
      case UserGuideLinkOption.File:
        return Files.Static.getUserGuide({ language, assessmentName, cycleName })
      default:
        return ''
    }
  }, [assessmentName, cycleName, language, userGuideLinkOption])

  return (
    <>
      <div className="separator" />
      <a href={userGuideLink} target="_top">
        {t('common.userGuide')}
      </a>
    </>
  )
}

const UserGuideLinkComponents = {
  [AssessmentNames.fra]: {
    '2020': (): ReactNode => UserGuideLinkInner({ userGuideLinkOption: UserGuideLinkOption.File }),
  },
}

const defaultComponent = <UserGuideLinkInner userGuideLinkOption={UserGuideLinkOption.TutorialPage} />

const UserGuideLink: React.FC = () => {
  const user = useUser()
  if (!user) return null

  return <CycleSwitch components={UserGuideLinkComponents} defaultComponent={defaultComponent} />
}

export default UserGuideLink
