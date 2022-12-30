import React from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'

import { useAppDispatch } from '@client/store'
import { useCountry } from '@client/store/assessment'
import { DataLockActions, useIsDataLocked } from '@client/store/ui/dataLock'
import { useCountryIso, useIsDataExportView } from '@client/hooks'
import Icon from '@client/components/Icon'
import { Breakpoints } from '@client/utils'

type Props = {
  lockEnabled: boolean
}

const Title: React.FC<Props> = (props) => {
  const { lockEnabled } = props
  const dispatch = useAppDispatch()

  const { i18n } = useTranslation()
  const isDataExportView = useIsDataExportView()
  const locked = useIsDataLocked()
  const canToggleLock = true // false // TODO
  const countryIso = useCountryIso()
  const country = useCountry(countryIso)

  const { deskStudy } = country.props

  return (
    <div className="nav-assessment-header__lock">
      <div>
        {isDataExportView ? ` - ${i18n.t('common.dataExport')}` : ''}
        {deskStudy && <div className="desk-study">({i18n.t<string>('assessment.deskStudy')})</div>}
      </div>

      {lockEnabled && (
        <MediaQuery minWidth={Breakpoints.laptop}>
          <button
            type="button"
            className="btn-s btn-secondary nav-assessment-header__btn-lock"
            disabled={!canToggleLock}
            onClick={() => dispatch(DataLockActions.toggleDataLock())}
          >
            <Icon name={locked ? 'lock-circle' : 'lock-circle-open'} className="icon-no-margin" />
          </button>
        </MediaQuery>
      )}
    </div>
  )
}

export default Title
