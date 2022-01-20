import React from 'react'
import PercentInput from '@client/components/PercentInput'
// import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useOriginalDataPoint } from '@client/store/data/originalDataPoint'
// import { useAppDispatch } from '@client/store'
// import { useTranslation } from 'react-i18next'
// import { useCountryIso } from '@client/hooks'
import { ODPNationalClass } from '@meta/assessment/originalDataPoint'
import { Numbers } from '@core/utils'
import { useNationalClassNameComments, useNationalClassValidation } from '../../hooks'

// const columns = [{ name: 'plantationIntroducedPercent', type: 'decimal' }]

const allowedClass = (nc: ODPNationalClass) => Number(nc.plantationPercent) > 0 && Number(nc.forestPercent) > 0

type Props = {
  canEditData: boolean
  index: number
}

const ForestCharacteristicsPlantationRow: React.FC<Props> = (props) => {
  const { canEditData, index } = props
  const originalDataPoint = useOriginalDataPoint()

  // const dispatch = useAppDispatch()
  // const { i18n } = useTranslation()
  // const countryIso = useCountryIso()

  const { nationalClasses, odpId } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { name, area, forestPercent, plantationPercent, plantationIntroducedPercent, uuid } = nationalClass
  const target = [odpId, 'class', `${uuid}`, 'plantation_forest_introduced']
  const classNameRowComments = useNationalClassNameComments(target)
  const validationStatus = useNationalClassValidation(index)
  const classNamePercentageValidation = validationStatus.validPlantationIntroducedPercentage === false ? 'error' : ''
  const plantationIntroduced = area
    ? Numbers.mul(area, Numbers.div(Numbers.mul(plantationPercent, forestPercent), 10000))
    : null

  if (!allowedClass(nationalClass)) {
    return null
  }

  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{name}</th>
      <th className="fra-table__calculated-sub-cell fra-table__divider">{Numbers.format(plantationIntroduced)}</th>
      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={plantationIntroducedPercent}
          onChange={() => {
            console.log('todo')
          }}
          onPaste={() => {
            console.log('todo')
          }}
          // {/*onChange={(event: React.ChangeEvent<HTMLInputElement>) => {*/}
          // // TODO
          // dispatch(
          //   OriginalDataPointActions.updateNationalClass({
          //     odp: originalDataPoint,
          //     index,
          //     field: 'plantationIntroducedPercent',
          //     prevValue: plantationIntroducedPercent,
          //     value: event.target.value,
          //   })
          // )
          //  }}
          //   onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
          // // TODO:
          // dispatch(
          //   OriginalDataPointActions.pasteNationalClass({
          //     odp: originalDataPoint,
          //     event,
          //     colIndex: 0,
          //     rowIndex: index,
          //     columns,
          //     allowedClass,
          //   })
          // )
          // }}
        />
      </td>

      <td className="fra-table__row-anchor-cell">
        {odpId && canEditData && (
          <div className="odp__review-indicator-row-anchor">
            {/* TODO */}
            {/* <ReviewIndicator */}
            {/*  section="odp" */}
            {/*  title={i18n.t('nationalDataPoint.plantationForest')} */}
            {/*  target={target} */}
            {/*  countryIso={countryIso} */}
            {/* /> */}
          </div>
        )}
      </td>
    </tr>
  )
}

export default ForestCharacteristicsPlantationRow
