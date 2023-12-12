import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentNames } from 'meta/assessment'

import { useUser } from 'client/store/user'
import { useLanguage } from 'client/hooks/useLanguage'
import CycleSwitch from 'client/components/CycleSwitch'

export const userGuideUrls: Record<string, string> = {
  en: 'https://www.fao.org/3/cc4690en/cc4690en.pdf',
  ar: 'https://www.fao.org/3/cc4690ar/cc4690ar.pdf',
  ch: 'https://www.fao.org/3/cc4690zh/cc4690zh.pdf',
  es: 'https://www.fao.org/3/cc4690es/cc4690es.pdf',
  fr: 'https://www.fao.org/3/cc4690fr/cc4690fr.pdf',
  ru: 'https://www.fao.org/3/cc4690ru/cc4690ru.pdf',
}

const Fra2025GuidelinesAndSpecifications: React.FC = () => {
  const { t } = useTranslation()
  const lang = useLanguage()

  return (
    <>
      <div className="landing__page-header">
        <h1 className="landing__page-title title">{t('tutorial.guidelinesAndSpecifications')}</h1>
      </div>
      <div className="list-tutorial ">
        <a target="_blank" rel="noreferrer" href={userGuideUrls[lang] ?? userGuideUrls.en}>
          {t('common.userGuide')}
        </a>
      </div>
    </>
  )
}

const GuidelinesAndSpecificationsComponents = {
  [AssessmentNames.fra]: {
    '2025': Fra2025GuidelinesAndSpecifications,
  },
}

const GuidelinesAndSpecifications: React.FC = () => {
  const user = useUser()
  if (!user) return null

  return <CycleSwitch components={GuidelinesAndSpecificationsComponents} />
}

export default GuidelinesAndSpecifications
