import './Flags.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Col, NodeValue, Row } from 'meta/assessment'
import { Authorizer } from 'meta/user'

import { useAssessmentSection, useCountry, useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

import EstimationMark from './EstimationMark'
import Flag from './Flag'

type Props = {
  col: Col
  nodeValue: NodeValue
  row: Row
  sectionName: string
}

const Flags: React.FC<Props> = (props) => {
  const { col, nodeValue, row, sectionName } = props

  const { t } = useTranslation()
  const countryIso = useCountryIso()
  const country = useCountry(countryIso)
  const user = useUser()
  const section = useAssessmentSection(sectionName)
  const cycle = useCycle()

  const canEditData = Authorizer.canEditData({ country, cycle, section, user })
  const withEstimation = canEditData && nodeValue?.estimationUuid
  const linkedNode = col.props.linkedNodes?.[cycle.uuid]

  if (!withEstimation && !linkedNode) {
    return null
  }

  return (
    <div className="data-cell__flags">
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