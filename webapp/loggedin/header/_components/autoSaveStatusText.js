import React from 'react'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import { getRelativeDate } from '@webapp/utils/relativeDate'

import useI18n from '@webapp/components/hooks/useI18n'

const AutoSaveStatusText = () => {
  const i18n = useI18n()
  //TODO use autoSaveStatus
  const lastSaveTimeStamp = useSelector(R.path(['autosave', 'lastSaveTimeStamp']))
  const status = useSelector(R.path(['autosave', 'status']))
  const hasStatus = !R.isNil(status) && !R.isNil(lastSaveTimeStamp)

  const statusTextTranslation = i18n.t(`header.autoSave.${status}`)

  const statusText = hasStatus
    ? status === 'lastSaveTimestampReceived'
      ? statusTextTranslation + getRelativeDate(lastSaveTimeStamp, i18n).toLowerCase()
      : statusTextTranslation
    : ''

  return hasStatus && (
    <div className={`fra-header__autosave status-${status}`}>
      {statusText}
    </div>
  )
}

export default AutoSaveStatusText
