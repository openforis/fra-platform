import React from 'react'
import { useDispatch } from 'react-redux'

import { ODP } from '@core/odp'
import * as NumberUtils from '@common/bignumberUtils'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import {
  pasteNationalClassValues,
  updateNationalClassValue,
} from '@webapp/app/assessment/fra/sections/originalDataPoint/actions'

import { PercentInput } from '@webapp/components/percentInput'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
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

  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()

  const nationalClass = odp.nationalClasses[index]
  const { className, area, forestPercent, otherWoodedLandPercent, uuid } = nationalClass
  const target = [odp.odpId, 'class', `${uuid}`, 'value']
  const classNameRowComments = useNationalClassNameComments(target)
  const validationStatus = useNationalClassValidation(index)
  const classNamePercentageValidation = validationStatus.validEofPercentage === false ? 'error' : ''
  const classNameAreaValidation = validationStatus.validArea === false ? 'error' : ''

  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{className}</th>
      <td className={`fra-table__cell fra-table__divider ${classNameAreaValidation}`}>
        <ThousandSeparatedDecimalInput
          disabled={!canEditData}
          numberValue={area}
          onChange={(event: any) => {
            dispatch(updateNationalClassValue(index, 'area', area, event.target.value))
          }}
          onPaste={(event: any) => {
            dispatch(
              pasteNationalClassValues({
                event,
                rowIndex: index,
                colIndex: 0,
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
            dispatch(updateNationalClassValue(index, 'forestPercent', forestPercent, event.target.value))
          }}
          onPaste={(event: any) => {
            dispatch(
              pasteNationalClassValues({
                event,
                rowIndex: index,
                colIndex: 1,
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
              updateNationalClassValue(index, 'otherWoodedLandPercent', otherWoodedLandPercent, event.target.value)
            )
          }}
          onPaste={(event: any) => {
            dispatch(
              pasteNationalClassValues({
                event,
                rowIndex: index,
                colIndex: 2,
                columns,
              })
            )
          }}
        />
      </td>

      <td className="fra-table__calculated-cell">
        {NumberUtils.formatNumber(NumberUtils.sub(100, NumberUtils.add(forestPercent, otherWoodedLandPercent)))}
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
