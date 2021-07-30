import React from 'react'
import { useDispatch } from 'react-redux'
import * as NumberUtils from '@common/bignumberUtils'
import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import { PercentInput } from '@webapp/components/percentInput'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import { pasteNationalClassValues, updateNationalClassValue } from '../../../actions'
import {
  useNationalClassNameComments,
  useNationalClassValidation,
} from '../../../../../../../../components/OriginalDataPoint/hooks'

const columns = [
  { name: 'area', type: 'decimal' },
  { name: 'forestPercent', type: 'decimal' },
  { name: 'otherWoodedLandPercent', type: 'decimal' },
  { name: 'otherLandPercent', type: 'decimal' },
]
type Props = {
  canEditData: boolean
  index: number
  odp: any
}
const ExtentOfForestRow = (props: Props) => {
  const { canEditData, index, odp } = props
  const { nationalClasses, odpId } = odp
  const nationalClass = nationalClasses[index]
  const { className, area, forestPercent, otherWoodedLandPercent, uuid } = nationalClass
  const target = [odpId, 'class', `${uuid}`, 'value']
  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()
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
              target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'value']}
              countryIso={countryIso}
            />
          </div>
        )}
      </td>
    </tr>
  )
}
export default ExtentOfForestRow
