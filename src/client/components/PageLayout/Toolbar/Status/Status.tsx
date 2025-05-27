import './Status.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'

import { Objects } from 'utils/objects'

import { Areas } from 'meta/area'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import Icon from 'client/components/Icon'
import PopoverControl from 'client/components/PopoverControl'
import { Breakpoints } from 'client/utils/breakpoints'

import { usePopoverItems } from './hooks/usePopoverItems'
import StatusConfirm from './StatusConfirm'
import { StatusTransition } from './types'

const Status: React.FC = () => {
  const { t } = useTranslation()
  const country = useAssessmentCountry()

  const [targetStatus, setTargetStatus] = useState<StatusTransition>(null)
  const items = usePopoverItems({ setTargetStatus })

  const status = Areas.getStatus(country)

  return (
    <>
      {targetStatus && <StatusConfirm onClose={() => setTargetStatus(null)} status={targetStatus} />}
      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <div className={`nav-header__status status-${status}`}>
          <span>{t<string>(`assessment.status.${status}.label`)}</span>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={Breakpoints.laptop}>
        <PopoverControl items={items}>
          <div className={`nav-header__status status-${status} actionable-${!Objects.isEmpty(items)}`}>
            <span>{t<string>(`assessment.status.${status}.label`)}</span>
            {!Objects.isEmpty(items) && <Icon className="icon-white icon-middle" name="small-down" />}
          </div>
        </PopoverControl>
      </MediaQuery>
    </>
  )
}

export default Status
