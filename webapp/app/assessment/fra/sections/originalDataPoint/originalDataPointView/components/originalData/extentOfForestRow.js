import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import * as NumberUtils from '@common/bignumberUtils'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import { PercentInput } from '@webapp/components/percentInput'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useCountryIso, useI18n } from '@webapp/components/hooks'

import { pasteNationalClassValues, updateNationalClassValue } from '../../../actions'
import useClassNameComments from '../useClassNameComments'
import useValidationNationalClass from '../useValidationNationalClass'

const columns = [
  { name: 'area', type: 'decimal' },
  { name: 'forestPercent', type: 'decimal' },
  { name: 'otherWoodedLandPercent', type: 'decimal' },
  { name: 'otherLandPercent', type: 'decimal' },
]
const ExtentOfForestRow = (props) => {
  const { canEditData, index, odp } = props
  const { nationalClasses, odpId } = odp
  const nationalClass = nationalClasses[index]
  const { className, area, forestPercent, otherWoodedLandPercent, uuid } = nationalClass
  const target = [odpId, 'class', `${uuid}`, 'value']

  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const classNameRowComments = useClassNameComments(target)
  const validationStatus = useValidationNationalClass(index)
  const classNamePercentageValidation = validationStatus.validEofPercentage === false ? 'error' : ''
  const classNameAreaValidation = validationStatus.validArea === false ? 'error' : ''

  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{className}</th>
      <td className={`fra-table__cell fra-table__divider ${classNameAreaValidation}`}>
        <ThousandSeparatedDecimalInput
          disabled={!canEditData}
          numberValue={area}
          onChange={(e) => {
            dispatch(updateNationalClassValue(index, 'area', area, e.target.value))
          }}
          onPaste={(evt) => {
            dispatch(
              pasteNationalClassValues({
                evt,
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
          onChange={(e) => {
            dispatch(updateNationalClassValue(index, 'forestPercent', forestPercent, e.target.value))
          }}
          onPaste={(evt) => {
            dispatch(
              pasteNationalClassValues({
                evt,
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
          onChange={(e) => {
            dispatch(updateNationalClassValue(index, 'otherWoodedLandPercent', otherWoodedLandPercent, e.target.value))
          }}
          onPaste={(evt) => {
            dispatch(
              pasteNationalClassValues({
                evt,
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
              target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'value']}
              countryIso={countryIso}
            />
          </div>
        )}
      </td>
    </tr>
  )
}

ExtentOfForestRow.propTypes = {
  canEditData: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  odp: PropTypes.object.isRequired,
}

export default ExtentOfForestRow
