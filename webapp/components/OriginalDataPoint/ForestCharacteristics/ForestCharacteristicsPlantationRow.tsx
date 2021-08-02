import React from 'react'
import { useDispatch } from 'react-redux'

import { ODP, ODPNationalClass } from '@core/odp'
import * as NumberUtils from '@common/bignumberUtils'
import { PercentInput } from '@webapp/components/percentInput'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import {
  pasteNationalClassValues,
  updateNationalClassValue,
} from '../../../sectionSpec/fra/originalDataPoint/actions'
import { useNationalClassNameComments, useNationalClassValidation } from '../hooks'

const columns = [{ name: 'plantationIntroducedPercent', type: 'decimal' }]

const allowedClass = (nc: ODPNationalClass) => Number(nc.plantationPercent) > 0 && Number(nc.forestPercent) > 0

type Props = {
  canEditData: boolean
  index: number
  odp: ODP
}

const ForestCharacteristicsPlantationRow: React.FC<Props> = (props) => {
  const { canEditData, index, odp } = props

  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()

  const { nationalClasses, odpId } = odp
  const nationalClass = nationalClasses[index]
  const { className, area, forestPercent, plantationPercent, plantationIntroducedPercent, uuid } = nationalClass
  const target = [odpId, 'class', `${uuid}`, 'plantation_forest_introduced']
  const classNameRowComments = useNationalClassNameComments(target)
  const validationStatus = useNationalClassValidation(index)
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
              section="odp"
              title={i18n.t('nationalDataPoint.plantationForest')}
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
