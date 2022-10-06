import React from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from '@utils/numbers'

import { ODPNationalClass, OriginalDataPoint } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { OriginalDataPointActions } from '@client/store/pages/originalDataPoint'
import PercentInput from '@client/components/PercentInput'
import ReviewIndicator from '@client/components/ReviewIndicator'

import { useNationalClassNameComments, useNationalClassValidation } from '../../hooks'

const columns = [
  { name: 'area', type: 'decimal' },
  { name: 'naturalForestPercent', type: 'decimal' },
  { name: 'plantationPercent', type: 'decimal' },
  { name: 'otherPlantedPercent', type: 'decimal' },
]

const allowedClass = (nc: ODPNationalClass) => Number(nc.forestPercent) > 0

type Props = {
  canEditData: boolean
  index: number
  originalDataPoint: OriginalDataPoint
}

const ForestCharacteristicsRow: React.FC<Props> = (props) => {
  const { canEditData, index, originalDataPoint } = props

  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()

  const { nationalClasses, id } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { name, area, naturalForestPercent, plantationPercent, otherPlantedPercent, uuid } = nationalClass
  const target = [id, 'class', `${uuid}`, 'forest_charasteristics'] as string[]
  const classNameRowComments = useNationalClassNameComments(target)
  const validationStatus = useNationalClassValidation(index)
  // TODO: Use classNames when validationStatus is implemented
  const classNamePercentageValidation = validationStatus.validFocPercentage === false ? 'error' : ''

  if (!allowedClass(nationalClass)) {
    return null
  }

  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{name}</th>
      <th className="fra-table__calculated-sub-cell fra-table__divider">
        {area && Numbers.format((Number(area) * Number(nationalClass.forestPercent)) / 100)}
      </th>
      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={naturalForestPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.updateNationalClass({
                odp: originalDataPoint,
                index,
                field: 'naturalForestPercent',
                prevValue: naturalForestPercent,
                value: event.target.value,
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.pasteNationalClass({
                odp: originalDataPoint,
                event,
                colIndex: 1,
                rowIndex: index,
                columns,
                allowedClass,
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
        />
      </td>

      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={plantationPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.updateNationalClass({
                odp: originalDataPoint,
                index,
                field: 'plantationPercent',
                prevValue: plantationPercent,
                value: event.target.value,
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.pasteNationalClass({
                odp: originalDataPoint,
                event,
                colIndex: 2,
                rowIndex: index,
                columns,
                allowedClass,
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
        />
      </td>

      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={otherPlantedPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.updateNationalClass({
                odp: originalDataPoint,
                index,
                field: 'otherPlantedPercent',
                prevValue: otherPlantedPercent,
                value: event.target.value,
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.pasteNationalClass({
                odp: originalDataPoint,
                event,
                colIndex: 3,
                rowIndex: index,
                columns,
                allowedClass,
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
        />
      </td>

      {originalDataPoint.id && canEditData && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            title={name}
            subtitle={i18n.t('nationalDataPoint.forestCharacteristics')}
            topicKey={`${originalDataPoint.id}-class-${uuid}-forestCharacteristics`}
          />
        </td>
      )}
    </tr>
  )
}

export default ForestCharacteristicsRow
