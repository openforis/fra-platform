import './SidePanel.scss'
import React, { useCallback, useTransition } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import classNames from 'classnames'

import { Routes } from 'meta/routes/routes'

import { useIsRoute } from 'client/hooks/routes'
import Icon from 'client/components/Icon'

const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
] as const

const SidePanel: React.FC = () => {
  const navigate = useNavigate()
  const [, startTransition] = useTransition()
  const { i18n, t } = useTranslation()

  const handleLanguageChange = useCallback<(l: string) => void>(
    (language: string): void => {
      startTransition(() => {
        i18n.changeLanguage(language)
      })
    },
    [i18n, startTransition]
  )

  const isKioskHomeRoute = useIsRoute({ path: Routes.Kiosk.path.absolute, exact: true })

  const goBack = useCallback((): void => {
    navigate(-1)
  }, [navigate])

  return (
    <div className="kiosk-side-panel">
      <div className="kiosk-side-panel__header">
        <img alt="FAO" className="kiosk-side-panel__header-logo" src="/img/fao/FAOen_2_lines_blue.png" />
        <div className="kiosk-side-panel__buttons">
          <button
            className="kiosk-side-panel__home-button"
            onClick={(): void => startTransition(() => navigate(Routes.Kiosk.path.absolute))}
            type="button"
          >
            <img alt="Go to kiosk home" className="kiosk-side-panel__home-icon" src="/img/kiosk/home-button.svg" />
          </button>
          {/* No conditional rendering here to avoid layout shifting in certain screen sizes */}
          <button
            className={classNames('kiosk-side-panel__back-button', { visible: !isKioskHomeRoute })}
            onClick={(): void => startTransition(() => goBack())}
            type="button"
          >
            <Icon name="arrow-back" />
          </button>
        </div>
      </div>
      <div className="kiosk-side-panel__content">
        <h1 className="kiosk-side-panel__title">Global Forest Resources Assessment</h1>
        <div className="kiosk-side-panel__language-buttons">
          {languageOptions.map(({ code, label }) => (
            <button
              key={code}
              className="kiosk-side-panel__language-button"
              onClick={(): void => handleLanguageChange(code)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="kiosk-side-panel__footer">
        <p>
          <strong>
            <i>{t('kiosk.withTheAssistanceOf')}</i>
          </strong>
        </p>
        <div className="kiosk-side-panel__partners">
          <img alt="EU" src="/img/partners/EU.jpg" />
          <img alt="Ministry for Foreign Affairs of Finland" src="/img/kiosk/partners/mfafi_black.png" />
          <img alt="NICFI" src="/img/partners/NICFI.png" />
          <img alt="CHE" src="/img/partners/CHE.png" />
          <img alt="GEF" src="/img/kiosk/partners/GEF_fullname.png" />
        </div>
      </div>
    </div>
  )
}

export default SidePanel
