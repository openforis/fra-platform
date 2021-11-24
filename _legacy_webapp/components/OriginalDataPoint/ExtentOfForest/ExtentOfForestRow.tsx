import React from 'react'

import { ODP } from '@core/odp'
import { Numbers } from '@core/utils/numbers'
import { useCountryIso, useI18n } from '../../../hooks'

import { PercentInput } from '../../../components/percentInput'
import ReviewIndicator from '../../../app/assessment/components/review/reviewIndicator'
import { ThousandSeparatedDecimalInput } from '../../../components/thousandSeparatedDecimalInput'
import { OriginalDataPointActions } from '../../../store/page/originalDataPoint'
import { useAppDispatch } from '../../../store'
import { useNationalClassNameComments, useNationalClassValidation } from '../hooks'

const columns = [
  { name: 'area', type: 'decimal' },
  { name: 'forestPercent', type: 'decimal' },
  { name: 'otherWoodedLandPercent', type: 'decimal' },
  { name: 'otherLandPercent', type: 'decimal' },
]

type Props = {
  canEditData: boolean
  index: number
  odp: ODP
}

const ExtentOfForestRow: React.FC<Props> = (props) => {
  const { canEditData, index, odp } = props

  const dispatch = useAppDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()

  const nationalClass = odp.nationalClasses[index]
  const { name, area, forestPercent, otherWoodedLandPercent, uuid } = nationalClass
  const target = [odp.odpId, 'class', `${uuid}`, 'value']
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
          onChange={(event: any) => {
            dispatch(
              OriginalDataPointActions.updateNationalClass({
                odp,
                index,
                field: 'area',
                prevValue: area,
                value: event.target.value,
              })
            )
          }}
          onPaste={(event: any) => {
            dispatch(
              OriginalDataPointActions.pasteNationalClass({
                odp,
                event,
                colIndex: 0,
                rowIndex: index,
                columns,
              })
            )
          }}
        />
      </td>

      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={forestPercent}
          onChange={(event: any) => {
            dispatch(
              OriginalDataPointActions.updateNationalClass({
                odp,
                index,
                field: 'forestPercent',
                prevValue: forestPercent,
                value: event.target.value,
              })
            )
          }}
          onPaste={(event: any) => {
            dispatch(
              OriginalDataPointActions.pasteNationalClass({
                odp,
                event,
                colIndex: 1,
                rowIndex: index,
                columns,
              })
            )
          }}
        />
      </td>

      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={otherWoodedLandPercent}
          onChange={(event: any) => {
            dispatch(
              OriginalDataPointActions.updateNationalClass({
                odp,
                index,
                field: 'otherWoodedLandPercent',
                prevValue: otherWoodedLandPercent,
                value: event.target.value,
              })
            )
          }}
          onPaste={(event: any) => {
            dispatch(
              OriginalDataPointActions.pasteNationalClass({
                odp,
                event,
                colIndex: 2,
                rowIndex: index,
                columns,
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
        {odp.odpId && canEditData && (
          <div className="odp__review-indicator-row-anchor">
            <ReviewIndicator
              section="odp"
              title={i18n.t('nationalDataPoint.forestCategoriesLabel')}
              target={target}
              countryIso={countryIso}
            />
          </div>
        )}
      </td>
    </tr>
  )
}

export default ExtentOfForestRow
