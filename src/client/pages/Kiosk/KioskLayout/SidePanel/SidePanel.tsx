import './SidePanel.scss'
import React, { useCallback, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'

import classNames from 'classnames'

import { Routes } from 'meta/routes'

import { useIsRoute } from 'client/hooks/useIsRoute'
import Icon from 'client/components/Icon'

const SidePanel: React.FC = () => {
  const navigate = useNavigate()
  const [, startTransition] = useTransition()

  const isKioskHomeRoute = useIsRoute({ path: Routes.Kiosk.path.absolute, exact: true })

  const goBack = useCallback((): void => {
    navigate(-1)
  }, [navigate])

  return (
    <div className="kiosk-side-panel">
      <div className="kiosk-side-panel__header">
        <img alt="FAO" src="/img/fao/FAOen_2_lines_blue.png" />
        <button
          className="kiosk-side-panel__home-button"
          onClick={(): void => startTransition(() => navigate(Routes.Kiosk.path.absolute))}
          type="button"
        >
          <Icon name="kiosk-home" />
        </button>
      </div>
      <div className="kiosk-side-panel__content">
        <h1 className="kiosk-side-panel__title">Global Forest Resources Assessment</h1>
        <div className="kiosk-side-panel__language-buttons">
          <button className="kiosk-side-panel__language-button" type="button">
            English
          </button>
          <button className="kiosk-side-panel__language-button" type="button">
            Français
          </button>
          <button className="kiosk-side-panel__language-button" type="button">
            Español
          </button>
        </div>
      </div>
      <div className="kiosk-side-panel__footer">
        <p>
          <i>With financial support of:</i>
        </p>
        <div className="kiosk-side-panel__partners">
          <img alt="NICFI" className="kiosk-side-panel__partners-nicfi" src="/img/partners/NICFI.png" />
          <img alt="EU" className="kiosk-side-panel__partners-eu" src="/img/partners/EU.jpg" />

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
    </div>
  )
}

export default SidePanel
