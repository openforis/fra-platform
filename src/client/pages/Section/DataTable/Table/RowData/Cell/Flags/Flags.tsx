import './Flags.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Col } from 'meta/assessment/col'
import { NodeValue } from 'meta/assessment/node'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
import { Authorizer } from 'meta/auth/authorizer'
import { Objects } from 'utils/objects'

import { useCountry } from 'client/store/area/hooks/country'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryIso } from 'client/hooks/country'

import EstimationMark from './EstimationMark'
import Flag from './Flag'
import OriginalValueMark from './OriginalValueMark'

type Props = {
  col: Col
  nodeValue: NodeValue
  row: Row
  sectionName: string
  table: Table
}

const Flags: React.FC<Props> = (props) => {
  const { col, nodeValue, row, sectionName, table } = props

  const { t } = useTranslation()
  const countryIso = useCountryIso()
  const country = useCountry(countryIso)
  const user = useUser()
  const section = useSection(sectionName)
  const cycle = useCycle()

  const canEditData = Authorizer.canEditSectionData({ country, cycle, section, user })
  const linkedNode = col.props.linkedNodes?.[cycle.uuid]
  const withEstimation = canEditData && nodeValue?.estimationUuid && !Objects.isEmpty(nodeValue?.raw) && !linkedNode
  const withOriginalValue = table.props.showOriginalValueInfo?.[cycle.uuid] && nodeValue && !nodeValue.calculated

  if (!withEstimation && !linkedNode && !withOriginalValue) {
    return null
  }

  return (
    <div className="table-grid__data-cell-flags">
      {withOriginalValue && <OriginalValueMark />}

      {linkedNode && (
        <Flag>
          {t(`${linkedNode.assessmentName}.labels.short`)}
          {` `}
          {linkedNode.cycleName}
        </Flag>
      )}

      {withEstimation && (
        <EstimationMark estimationUuid={nodeValue.estimationUuid} variableName={row.props.variableName} />
      )}
    </div>
  )
}

export default Flags
