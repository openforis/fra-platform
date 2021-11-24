import './autoSaveStatus.scss'
import React from 'react'
import { getRelativeDate } from '../../../utils/relativeDate'
import { useI18n } from '../../../hooks'
import { useUserInfo } from '../../../store/user'
import { useAppSelector } from '../../../store'
import { Objects } from '@core/utils'

const AutoSaveStatus: React.FC = () => {
  const i18n = useI18n()
  const userInfo = useUserInfo()
  // Because of strange behavior, we cannot use ex. useSelector(AutoSaveState.getState) or similar
  // This is the working solution for autosave state
  const autosave = useAppSelector((state) => state.autosave)
  const lastSaveTimeStamp = autosave && autosave.lastSaveTimeStamp
  const status = autosave && autosave.status
  const hasStatus = userInfo && status && !Objects.isEmpty(status)
  const islastSaveTimestampReceived = status === 'lastSaveTimestampReceived'
  // Note: Status can be also 'Saving'
  if (!hasStatus || (islastSaveTimestampReceived && !lastSaveTimeStamp)) {
    return null
  }
  let statusText = (i18n as any).t(`header.autoSave.${status}`)
  if (islastSaveTimestampReceived) statusText += getRelativeDate(lastSaveTimeStamp, i18n).toLowerCase()
  return <div className={`autosave-status status-${status}`}>{statusText}</div>
}

export default AutoSaveStatus
