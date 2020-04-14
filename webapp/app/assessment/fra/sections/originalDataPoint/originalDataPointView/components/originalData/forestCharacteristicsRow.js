import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import * as NumberUtils from '@common/bignumberUtils'

import { PercentInput } from '@webapp/components/percentInput'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useCountryIso, useI18n } from '@webapp/components/hooks'

import { pasteNationalClassValues, updateNationalClassValue } from '../../../actions'
import useClassNameComments from '../useClassNameComments'
import useValidationNationalClass from '../useValidationNationalClass'

const columns = [
  { name: 'area', type: 'decimal' },
  { name: 'naturalForestPercent', type: 'decimal' },
  { name: 'plantationPercent', type: 'decimal' },
  { name: 'otherPlantedPercent', type: 'decimal' },
]

const allowedClass = (nc) => nc.forestPercent > 0

const ForestCharacteristicsRow = (props) => {
  const { canEditData, index, odp } = props
  const { nationalClasses, odpId } = odp
  const nationalClass = nationalClasses[index]
  const { className, area, naturalForestPercent, plantationPercent, otherPlantedPercent, uuid } = nationalClass
  const target = [odpId, 'class', `${uuid}`, 'forest_charasteristics']

  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const classNameRowComments = useClassNameComments(target)
  const validationStatus = useValidationNationalClass(index)
  const classNamePercentageValidation = validationStatus.validFocPercentage === false ? 'error' : ''

  if (!allowedClass(nationalClass)) {
    return null
  }

  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{className}</th>
      <th className="fra-table__calculated-sub-cell fra-table__divider">
        {area && NumberUtils.formatNumber((area * nationalClass.forestPercent) / 100)}
      </th>
      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={naturalForestPercent}
          onChange={(e) => {
            dispatch(updateNationalClassValue(index, 'naturalForestPercent', naturalForestPercent, e.target.value))
          }}
          onPaste={(evt) => {
            dispatch(
              pasteNationalClassValues({
                evt,
                rowIndex: index,
                colIndex: 1,
                columns,
                allowedClass,
              })
            )
          }}
        />
      </td>
      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={plantationPercent}
          onChange={(e) => {
            dispatch(updateNationalClassValue(index, 'plantationPercent', plantationPercent, e.target.value))
          }}
          onPaste={(evt) => {
            dispatch(
              pasteNationalClassValues({
                evt,
                rowIndex: index,
                colIndex: 2,
                columns,
                allowedClass,
              })
            )
          }}
        />
      </td>
      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={otherPlantedPercent}
          onChange={(e) => {
            dispatch(updateNationalClassValue(index, 'otherPlantedPercent', otherPlantedPercent, e.target.value))
          }}
          onPaste={(evt) => {
            dispatch(
              pasteNationalClassValues({
                evt,
                rowIndex: index,
                colIndex: 3,
                columns,
                allowedClass,
              })
            )
          }}
        />
      </td>
      <td className="fra-table__row-anchor-cell">
        {odp.odpId && canEditData && (
          <div className="odp__review-indicator-row-anchor">
            <ReviewIndicator
              section="odp"
              title={i18n.t('nationalDataPoint.forestCharacteristics')}
              target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'forest_charasteristics']}
              countryIso={countryIso}
            />
          </div>
        )}
      </td>
    </tr>
  )
}

ForestCharacteristicsRow.propTypes = {
  canEditData: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  odp: PropTypes.object.isRequired,
}

export default ForestCharacteristicsRow
