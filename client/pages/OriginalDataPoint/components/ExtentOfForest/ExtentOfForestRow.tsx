import React from 'react'
import { Numbers } from '@core/utils'

import PercentInput from '@client/components/PercentInput'
// import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import ThousandSeparatedDecimalInput from '@client/components/ThousandSeparatedDecimalInput'
import { useAssessment, useCycle } from '@client/store/assessment'
import { OriginalDataPointActions, useOriginalDataPoint } from '@client/store/pages/originalDataPoint'
// import { useTranslation } from 'react-i18next'
// import { useCountryIso } from '@client/hooks'
import { useAppDispatch } from '@client/store'
import { useNationalClassNameComments, useNationalClassValidation } from '../../hooks'

const columns = [
  { name: 'area', type: 'decimal' },
  { name: 'forestPercent', type: 'decimal' },
  { name: 'otherWoodedLandPercent', type: 'decimal' },
  { name: 'otherLandPercent', type: 'decimal' },
]

type Props = {
  canEditData: boolean
  index: number
}

const ExtentOfForestRow: React.FC<Props> = (props) => {
  const { canEditData, index } = props
  const originalDataPoint = useOriginalDataPoint()

  const dispatch = useAppDispatch()
  // const { i18n } = useTranslation()
  // const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const nationalClass = originalDataPoint.nationalClasses[index]
  const { name, area, forestPercent, otherWoodedLandPercent, uuid } = nationalClass
  const target = [originalDataPoint.id, 'class', `${uuid}`, 'value'] as string[]
  const classNameRowComments = useNationalClassNameComments(target)
  const validationStatus = useNationalClassValidation(index)
  const classNamePercentageValidation = validationStatus.validEofPercentage === false ? 'error' : ''
  const classNameAreaValidation = validationStatus.validArea === false ? 'error' : ''

  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{name}</th>
      <td className={`fra-table__cell fra-table__divider ${classNameAreaValidation}`}>
        <ThousandSeparatedDecimalInput
          disabled={!canEditData}
          numberValue={area}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.updateNationalClass({
                odp: originalDataPoint,
                index,
                field: 'area',
                prevValue: area,
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
                colIndex: 0,
                rowIndex: index,
                columns,
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
          numberValue={forestPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.updateNationalClass({
                odp: originalDataPoint,
                index,
                field: 'forestPercent',
                prevValue: forestPercent,
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
          numberValue={otherWoodedLandPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.updateNationalClass({
                odp: originalDataPoint,
                index,
                field: 'otherWoodedLandPercent',
                prevValue: otherWoodedLandPercent,
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
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
        />
      </td>

      <td className="fra-table__calculated-cell">
        {Numbers.format(Numbers.sub(100, Numbers.add(forestPercent, otherWoodedLandPercent)))}
        <span style={{ marginLeft: '8px' }}>%</span>
      </td>

      <td className="fra-table__row-anchor-cell">
        {originalDataPoint.id && canEditData && (
          <div className="odp__review-indicator-row-anchor">
            {/* <ReviewIndicator
              section="odp"
              title={i18n.t('nationalDataPoint.forestCategoriesLabel')}
              target={target}
              countryIso={countryIso}
            /> */}
          </div>
        )}
      </td>
    </tr>
  )
}

export default ExtentOfForestRow
