import React from 'react'
import './languageSelectorMobile.scss'

import { Lang, LanguageCodes } from '@core/lang'

import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

const LanguageSelectorMobile: React.FC = () => {
  // const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  return (
    <div className="lang-selector" style={{ gridTemplateColumns: `repeat(${LanguageCodes.length},auto)` }}>
      {LanguageCodes.map((lang: Lang) => (
        <button
          key={lang}
          className={classNames('btn', 'btn-xs')}
          disabled={i18n.language === lang}
          // onClick={() => dispatch(AppActions.switchLanguage(lang))}
          type="button"
        >
          {i18n.t(`language.${lang}`)}
        </button>
      ))}
    </div>
  )
}
export default LanguageSelectorMobile
