import './LanguageSelectorMobile.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Lang, LanguageCodes } from 'meta/lang'

import { useUpdateLanguage } from 'client/hooks/language'

const LanguageSelectorMobile: React.FC = () => {
  const { i18n } = useTranslation()
  const updateLanguage = useUpdateLanguage()

  return (
    <div className="lang-selector" style={{ gridTemplateColumns: `repeat(${LanguageCodes.length},auto)` }}>
      {LanguageCodes.map((lang: Lang) => (
        <button
          key={lang}
          className={classNames('btn', 'btn-xs')}
          disabled={i18n.resolvedLanguage === lang}
          onClick={(): Promise<void> => updateLanguage({ lang })}
          type="button"
        >
          {i18n.t<string>(`language.${lang}`)}
        </button>
      ))}
    </div>
  )
}

export default LanguageSelectorMobile
