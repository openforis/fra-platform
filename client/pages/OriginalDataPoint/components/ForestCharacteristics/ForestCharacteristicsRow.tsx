import React from 'react'
// import { useDispatch } from 'react-redux'

import PercentInput from '@client/components/PercentInput'
// import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useOriginalDataPoint } from '@client/store/pages/originalDataPoint'
import { ODPNationalClass } from '@meta/assessment/originalDataPoint'
// import { useTranslation } from 'react-i18next'
// import { useCountryIso } from '@client/hooks'
import { Numbers } from '@core/utils'
import { useNationalClassNameComments, useNationalClassValidation } from '../../hooks'

// const columns = [
//   { name: 'area', type: 'decimal' },
//   { name: 'naturalForestPercent', type: 'decimal' },
//   { name: 'plantationPercent', type: 'decimal' },
//   { name: 'otherPlantedPercent', type: 'decimal' },
// ]

const allowedClass = (nc: ODPNationalClass) => Number(nc.forestPercent) > 0

type Props = {
  canEditData: boolean
  index: number
}

const ForestCharacteristicsRow: React.FC<Props> = (props) => {
  const { canEditData, index } = props
  const originalDataPoint = useOriginalDataPoint()

  // const dispatch = useDispatch()
  // const { i18n } = useTranslation()
  // const countryIso = useCountryIso()

  const { nationalClasses, odpId } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { name, area, naturalForestPercent, plantationPercent, otherPlantedPercent, uuid } = nationalClass
  const target = [odpId, 'class', `${uuid}`, 'forest_charasteristics']
  const classNameRowComments = useNationalClassNameComments(target)
  const validationStatus = useNationalClassValidation(index)
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
          onChange={() => {
            console.log('todo')
          }}
          onPaste={() => {
            console.log('todo')
          }}
          // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          // // TODO
          // dispatch(
          //   OriginalDataPointActions.updateNationalClass({
          //     odp: originalDataPoint,
          //     index,
          //     field: 'naturalForestPercent',
          //     prevValue: naturalForestPercent,
          //     value: event.target.value,
          //   })
          // )
          // }}
          // onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
          // //TODO
          // dispatch(
          //   OriginalDataPointActions.pasteNationalClass({
          //     odp: originalDataPoint,
          //     event,
          //     colIndex: 1,
          //     rowIndex: index,
          //     columns,
          //     allowedClass,
          //   })
          // )
          // }}
        />
      </td>

      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={plantationPercent}
          onChange={() => {
            console.log('todo')
          }}
          onPaste={() => {
            console.log('todo')
          }}
          // onChange={(event: any) => {
          // // TODO
          // dispatch(
          //   OriginalDataPointActions.updateNationalClass({
          //     odp: originalDataPoint,
          //     index,
          //     field: 'plantationPercent',
          //     prevValue: plantationPercent,
          //     value: event.target.value,
          //   })
          // )
          // }}
          // onPaste={(event: any) => {
          // // TODO
          // dispatch(
          //   OriginalDataPointActions.pasteNationalClass({
          //     odp: originalDataPoint,
          //     event,
          //     colIndex: 2,
          //     rowIndex: index,
          //     columns,
          //     allowedClass,
          //   })
          // )
          // }}
        />
      </td>

      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={otherPlantedPercent}
          onChange={() => {
            console.log('todo')
          }}
          onPaste={() => {
            console.log('todo')
          }}
          //    onChange={(event: any) => {
          // // TODO
          // dispatch(
          //   OriginalDataPointActions.updateNationalClass({
          //     odp: originalDataPoint,
          //     index,
          //     field: 'otherPlantedPercent',
          //     prevValue: otherPlantedPercent,
          //     value: event.target.value,
          //   })
          // )
          //  }}
          // onPaste={(event: any) => {
          // // TODO
          // dispatch(
          //   OriginalDataPointActions.pasteNationalClass({
          //     odp: originalDataPoint,
          //     event,
          //     colIndex: 3,
          //     rowIndex: index,
          //     columns,
          //     allowedClass,
          //   })
          // )
          //  }}
        />
      </td>

      <td className="fra-table__row-anchor-cell">
        {originalDataPoint.odpId && canEditData && (
          <div className="odp__review-indicator-row-anchor">
            {/* <ReviewIndicator */}
            {/*  section="odp" */}
            {/*  title={i18n.t('nationalDataPoint.forestCharacteristics')} */}
            {/*  target={[ */}
            {/*    originalDataPoint.odpId, */}
            {/*    'class', */}
            {/*    `${originalDataPoint.nationalClasses[index].uuid}`, */}
            {/*    'forest_charasteristics', */}
            {/*  ]} */}
            {/*  countryIso={countryIso} */}
            {/* /> */}
          </div>
        )}
      </td>
    </tr>
  )
}

export default ForestCharacteristicsRow
