import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { LanguageCodes } from 'meta/lang'
import { TrackId } from 'meta/tracking/id'

import { useLanguage, useUpdateLanguage } from 'client/hooks/language'
import Icon from 'client/components/Icon'
import PopoverControl from 'client/components/PopoverControl'
import { Tracking } from 'client/utils/tracking'

const LanguageSelector: React.FC = () => {
  const { t } = useTranslation()
  const language = useLanguage()
  const updateLanguage = useUpdateLanguage()

  const languageSelectionItems = useMemo(
    () =>
      LanguageCodes.map((lang) => ({
        content: t(`language.${lang}`),
        onClick: (): void => {
          Tracking.select({ elementId: TrackId.headerLanguageSelect, value: lang })
          updateLanguage({ lang })
        },
      })),
    [t, updateLanguage]
  )

  return (
    <PopoverControl items={languageSelectionItems}>
      <div className="app-header__menu-item">
        {t(`language.${language}`)}
        <Icon className="icon-middle" name="small-down" />
      </div>
    </PopoverControl>
  )
}
export default LanguageSelector
