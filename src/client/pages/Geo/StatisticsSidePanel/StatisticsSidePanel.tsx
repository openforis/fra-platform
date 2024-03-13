import './StatisticsSidePanel.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

const StatisticsSidePanel: React.FC = () => {
  const [open, setOpen] = useState(false)

  const { t } = useTranslation()

  const handleNotchClick = () => {
    setOpen((prevState) => !prevState)
  }

  return (
    <div className={classNames('geo-statistics-side-panel', { open })}>
      <button
        aria-label={t('geo.statistics')}
        className="geo-statistics-side-panel__notch-button"
        onClick={handleNotchClick}
        type="button"
      />
      <div className="geo-statistics-side-panel__content-container">
        <span>This is the side panel content.</span>
      </div>
    </div>
  )
}

export default StatisticsSidePanel
