import React from 'react'
import './languageSelectorMobile.scss'

import { LanguageCodes } from '@core/lang'
import { useAppDispatch } from '@webapp/store'

import { useI18n } from '@webapp/components/hooks'
import classNames from 'classnames'
import { AppActions } from '@webapp/store/app'

const LanguageSelectorMobile: React.FC = () => {
  const dispatch = useAppDispatch()
  const i18n = useI18n()

  return (
    <div className="lang-selector" style={{ gridTemplateColumns: `repeat(${LanguageCodes.length},auto)` }}>
      {LanguageCodes.map((lang) => (
        <button
          key={lang}
          className={classNames('btn', 'btn-xs')}
          disabled={i18n.language === lang}
          onClick={() => dispatch(AppActions.switchLanguage(lang))}
          type="button"
        >
          {i18n.t(`language.${lang}`)}
        </button>
      ))}
    </div>
  )
}
export default LanguageSelectorMobile
