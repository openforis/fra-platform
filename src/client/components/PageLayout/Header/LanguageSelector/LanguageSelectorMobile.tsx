import './LanguageSelectorMobile.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Lang, LanguageCodes } from 'meta/lang'
import { TrackId } from 'meta/tracking/id'

import { useLanguage, useUpdateLanguage } from 'client/hooks/language'
import Button, { ButtonType } from 'client/components/Buttons/Button'
import { Tracking } from 'client/utils/tracking'

const LanguageSelectorMobile: React.FC = () => {
  const { t } = useTranslation()
  const language = useLanguage()
  const updateLanguage = useUpdateLanguage()

  return (
    <div className="lang-selector" style={{ gridTemplateColumns: `repeat(${LanguageCodes.length},auto)` }}>
      {LanguageCodes.map((lang: Lang) => (
        <Button
          key={lang}
          disabled={language === lang}
          label={t(`language.${lang}`)}
          onClick={(): void => {
            Tracking.select({ elementId: TrackId.headerLanguageSelect, value: lang })
            updateLanguage({ lang })
          }}
          type={ButtonType.transparent}
        />
      ))}
    </div>
  )
}

export default LanguageSelectorMobile
