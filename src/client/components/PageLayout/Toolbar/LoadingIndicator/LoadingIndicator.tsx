import './LoadingIndicator.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { useLoadingIndicatorState } from './hooks/useLoadingIndicatorState'

const LoadingIndicator: React.FC = () => {
  const { t } = useTranslation()

  const { show, showCheck } = useLoadingIndicatorState()

  if (!show) return null

  const indicatorText = t(showCheck ? 'header.autoSave.complete' : 'header.autoSave.saving')

  return (
    <div className="loading-indicator">
      <span className="loading-indicator__icon-wrapper">
        <span className={classNames('circle-loader', { 'load-complete': showCheck })} />
        <span className={classNames('checkmark', { draw: showCheck })} />
      </span>
      <span className="loading-indicator__text"> {indicatorText} </span>
    </div>
  )
}

export default LoadingIndicator
