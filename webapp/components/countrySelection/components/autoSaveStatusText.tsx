import './autoSaveStatusText.less'
import React from 'react'
import { useSelector } from 'react-redux'
import * as R from 'ramda'
import { getRelativeDate } from '@webapp/utils/relativeDate'
import { useI18n, useUserInfo } from '@webapp/components/hooks'

const AutoSaveStatusText = () => {
  const i18n = useI18n()
  const userInfo = useUserInfo()
  // Because of strange behavior, we cannot use ex. useSelector(AutoSaveState.getState) or similar
  // This is the working solution for autosave state
  const autosave = useSelector((state) => (state as any).autosave)
  const lastSaveTimeStamp = autosave && autosave.lastSaveTimeStamp
  const status = autosave && autosave.status
  const hasStatus = userInfo && !R.isNil(status)
  const islastSaveTimestampReceived = status === 'lastSaveTimestampReceived'
  // Note: Status can be also 'Saving'
  if (!hasStatus || (islastSaveTimestampReceived && !lastSaveTimeStamp)) {
    return null
  }
  let statusText = (i18n as any).t(`header.autoSave.${status}`)
  if (islastSaveTimestampReceived) statusText += getRelativeDate(lastSaveTimeStamp, i18n).toLowerCase()
  return <div className={`autosave-status status-${status}`}>{statusText}</div>
}
export default AutoSaveStatusText
