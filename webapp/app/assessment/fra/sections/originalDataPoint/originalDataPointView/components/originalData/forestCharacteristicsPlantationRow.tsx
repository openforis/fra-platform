import React from 'react'
import { useDispatch } from 'react-redux'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'
import { PercentInput } from '@webapp/components/percentInput'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import { pasteNationalClassValues, updateNationalClassValue } from '../../../actions'
import useClassNameComments from '../useClassNameComments'
import useValidationNationalClass from '../useValidationNationalClass'

const columns = [{ name: 'plantationIntroducedPercent', type: 'decimal' }]
const allowedClass = (nc: any) => nc.plantationPercent > 0 && nc.forestPercent > 0
type ForestCharacteristicsPlantationRowProps = {
  canEditData: boolean
  index: number
  odp: any
}
const ForestCharacteristicsPlantationRow = (props: ForestCharacteristicsPlantationRowProps) => {
  const { canEditData, index, odp } = props
  const { nationalClasses, odpId } = odp
  const nationalClass = nationalClasses[index]
  const { className, area, forestPercent, plantationPercent, plantationIntroducedPercent, uuid } = nationalClass
  const target = [odpId, 'class', `${uuid}`, 'plantation_forest_introduced']
  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const classNameRowComments = useClassNameComments(target)
  const validationStatus = useValidationNationalClass(index)
  const classNamePercentageValidation = validationStatus.validPlantationIntroducedPercentage === false ? 'error' : ''
  const plantationIntroduced = area
    ? NumberUtils.mul(area, NumberUtils.div(NumberUtils.mul(plantationPercent, forestPercent), 10000))
    : null
  if (!allowedClass(nationalClass)) {
    return null
  }
  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{className}</th>
      <th className="fra-table__calculated-sub-cell fra-table__divider">
        {NumberUtils.formatNumber(plantationIntroduced)}
      </th>
      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ disabled: boolean; numberValue: any; onCha... Remove this comment to see the full error message
          disabled={!canEditData}
          numberValue={plantationIntroducedPercent}
          onChange={(event: any) => {
            dispatch(
              updateNationalClassValue(
                index,
                'plantationIntroducedPercent',
                plantationIntroducedPercent,
                event.target.value
              )
            )
          }}
          onPaste={(event: any) => {
            dispatch(
              pasteNationalClassValues({
                event,
                rowIndex: index,
                colIndex: 0,
                columns,
                allowedClass,
              })
            )
          }}
        />
      </td>

      <td className="fra-table__row-anchor-cell">
        {odpId && canEditData && (
          <div className="odp__review-indicator-row-anchor">
            <ReviewIndicator
              // @ts-expect-error ts-migrate(2322) FIXME: Type '{ section: string; title: any; target: any[]... Remove this comment to see the full error message
              section="odp"
              title={(i18n as any).t('nationalDataPoint.plantationForest')}
              target={target}
              countryIso={countryIso}
            />
          </div>
        )}
      </td>
    </tr>
  )
}
export default ForestCharacteristicsPlantationRow
