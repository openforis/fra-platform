import React from 'react'
import { Link } from 'react-router-dom'

import { FRA, TableDatumODP } from '@core/assessment'
import * as BasePaths from '@webapp/main/basePaths'
import { useCountryIso, useI18n } from '@webapp/hooks'
import { usePrintView } from '@webapp/store/app'

import Icon from '@webapp/components/icon'
import Tooltip from '@webapp/components/tooltip'
import { useUserInfo } from '@webapp/store/user'

type Props = {
  datum: TableDatumODP
  sectionName: string
}

const CellOdpHeader: React.FC<Props> = (props) => {
  const { datum, sectionName } = props

  const countryIso = useCountryIso()
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const [printView] = usePrintView()

  const { name, year, type, draft, odpId } = datum
  const label = name || year
  const odp = type === 'odp'
  const className = odp && !printView ? 'odp-header-cell' : 'fra-table__header-cell'

  return (
    <th className={className}>
      {odp && !printView ? (
        <Tooltip text={i18n.t('nationalDataPoint.clickOnNDP')}>
          <Link className="link" to={BasePaths.getOdpLink(countryIso, FRA.type, sectionName, odpId)}>
            {draft && userInfo && <Icon className="icon-sub icon-margin-right" name="pencil" />}
            {label}
          </Link>
        </Tooltip>
      ) : (
        label
      )}
    </th>
  )
}

export default CellOdpHeader
