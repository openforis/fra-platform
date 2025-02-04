import './History.scss'
import React from 'react'

import classNames from 'classnames'

import { CountryIso } from 'meta/area'
import { Cols, NodeValue } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useLastApprovedHistoryTableData } from 'client/store/data/hooks/useLastApprovedHistoryTableData'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import DiffText from 'client/components/DiffText'

import { PropsCell } from '../props'
import { useChanges } from './hooks/useChanges'

const History: React.FC<PropsCell> = (props) => {
  const { nodeValue, table, col, row } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const tableName = table.props.name
  const { colName } = col.props
  const { variableName } = row.props
  const isNumeric = Cols.isNumeric(col)
  const data = useLastApprovedHistoryTableData()

  const nodeValueProps = { assessmentName, cycleName, countryIso, tableName, colName, variableName, data }
  const nodeValueA = RecordAssessmentDatas.getNodeValue(nodeValueProps) ?? ({} as NodeValue)
  const nodeValueB = nodeValue ?? ({} as NodeValue)

  const changes = useChanges({ nodeValueA, nodeValueB, row, col })

  const className = classNames('input-text', 'disabled', {
    'table-grid__data-cell-input-text': !isNumeric,
    'table-grid__data-cell-input-number': isNumeric,
  })

  return <DiffText changes={changes} className={className} />
}

export default History
