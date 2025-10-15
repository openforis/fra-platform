import './SidePanel.scss'
import React, { useCallback, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'

import classNames from 'classnames'

import { Routes } from 'meta/routes'

import { useIsRoute } from 'client/hooks/routes'
import Icon from 'client/components/Icon'

const SidePanel: React.FC = () => {
  const navigate = useNavigate()
  const [, startTransition] = useTransition()

  const isKioskHomeRoute = useIsRoute({ path: Routes.Kiosk.path.absolute, exact: true })

  const goBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <div className="kiosk-side-panel">
      <div className="kiosk-side-panel__header">
        <img alt="FAO" src="/img/fao/FAOen_3_lines.svg" />
        <button
          className="kiosk-side-panel__home-button"
          onClick={() => startTransition(() => navigate(Routes.Kiosk.path.absolute))}
          type="button"
        >
          <Icon name="home-circle" />
        </button>
      </div>
      <div className="kiosk-side-panel__quiz">
        {/* <h1>Get to know FRA and test your knowledge!</h1> */}
        <div className="kiosk-side-panel__quiz-img-container">
          {/* <div className="kiosk-side-panel__quiz-title">FRA quiz</div> */}
          <img alt="quiz" className="kiosk-side-panel__quiz-img" src="/img/kiosk/quiz-bubbles.png" />
        </div>
      </div>
      <div className="kiosk-side-panel__footer">
        <p>
          <i>Created with the financial support of:</i>
        </p>
        <div className="kiosk-side-panel__partners">
          <img alt="EU" className="kiosk-side-panel__partners-eu" src="/img/partners/EU.jpg" />
          <img alt="NICFI" className="kiosk-side-panel__partners-nicfi" src="/img/partners/NICFI.png" />

          {/* No conditional rendering here to avoid layout shifting in certain screen sizes */}
          <button
            className={classNames('kiosk-side-panel__back-button', { visible: !isKioskHomeRoute })}
            onClick={() => startTransition(() => goBack())}
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
