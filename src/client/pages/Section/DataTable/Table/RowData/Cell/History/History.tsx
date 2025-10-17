import './History.scss'
import React, { useMemo } from 'react'

import classNames from 'classnames'

import { CountryIso } from 'meta/area'
import { Cols } from 'meta/assessment/cols'

import { useLastApprovedHistoryNodeValue } from 'client/store/data/history/hooks/lastApprovedTableData'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import DiffText from 'client/components/DiffText'

import { PropsCell } from '../props'
import { useChanges } from './hooks/useChanges'

const History: React.FC<PropsCell> = (props) => {
  const { col, nodeValue = { raw: '' }, row, table } = props
  const { name: tableName } = table.props
  const { colName } = col.props
  const { variableName } = row.props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const _props = { assessmentName, cycleName, countryIso, tableName, colName, variableName }
  const nodeValueA = useLastApprovedHistoryNodeValue(_props)
  const changes = useChanges({ nodeValueA, nodeValueB: nodeValue, row, col })

  const className = useMemo<string>(() => {
    const numeric = Cols.isNumeric(col)
    const calculated = Cols.isCalculated({ col, row })
    return classNames('history-cell', 'disabled', {
      'input-text': !calculated,
      'table-grid__data-cell-input-number': numeric,
    })
  }, [col, row])

  return <DiffText changes={changes} className={className} />
}

export default History
