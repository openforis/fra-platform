import './RecentHighlightsButton.scss'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import SlidingPanel from 'client/components/SlidingPanel'

const RecentHighlightsButton: React.FC = () => {
  const { t } = useTranslation()

  const [opened, setOpened] = useState(false)
  const openPanel = useCallback(() => setOpened(true), [setOpened])
  const closePanel = useCallback(() => setOpened(false), [setOpened])

  return (
    <div className="kiosk-recent-highlights">
      <button
        aria-expanded={opened}
        className={classNames('kiosk-latest-activities__map-button', { 'is-open': opened })}
        onClick={openPanel}
        type="button"
      >
        <h1>{t('kiosk.recentHighlights')}</h1>
      </button>

      <SlidingPanel closePanel={closePanel} noBackdrop opened={opened} size={78}>
        <object
          aria-label="FAO Newsletter"
          className="kiosk-content__embedded-object"
          data="https://bit.ly/42aEUpk"
          type="text/html"
        />
      </SlidingPanel>
    </div>
  )
}

export default RecentHighlightsButton
