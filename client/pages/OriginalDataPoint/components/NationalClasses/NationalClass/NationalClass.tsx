import React from 'react'
import { Objects } from '@core/utils'

import Icon from '@client/components/Icon'
import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'
// import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useTranslation } from 'react-i18next'
// import { useCountryIso } from '@client/hooks'
// import { useAppDispatch } from '@client/store'
import { useOriginalDataPoint } from '@client/store/data/originalDataPoint'
import { useNationalClassNameComments, useNationalClassValidation } from '../../../hooks'

// const columns = [
//   { name: 'className', type: 'text' },
//   { name: 'definition', type: 'text' },
// ]

type Props = {
  canEditData: boolean
  index: number
}

const NationalClass: React.FC<Props> = (props) => {
  const { index, canEditData } = props
  const originalDataPoint = useOriginalDataPoint()

  // const dispatch = useAppDispatch()
  const i18n = useTranslation()
  // const countryIso = useCountryIso()
  const [printView] = [false] // usePrintView()

  const nationalClass = originalDataPoint.nationalClasses[index]
  const { name, definition, uuid, placeHolder } = nationalClass
  const target = [originalDataPoint.odpId, 'class', `${uuid}`, 'definition']
  const classNameRowComments = useNationalClassNameComments(target)
  const validation = useNationalClassValidation(index)

  return (
    <tr className={classNameRowComments}>
      <td className={`fra-table__cell-left odp__nc-table__name ${validation.validClassName === false ? 'error' : ''}`}>
        <div className="odp__nc-table__input-container">
          {printView ? (
            <div className="text-input__readonly-view only-print" style={{ paddingTop: 0, paddingBottom: 0 }}>
              {name || ''}
            </div>
          ) : (
            <input
              className="odp__nc-table__input validation-error-sensitive-field"
              type="text"
              placeholder={
                placeHolder && index === 0 ? i18n.t('nationalDataPoint.enterOrCopyPasteNationalClasses') : ''
              }
              value={name || ''}
              onChange={() => {
                console.log('todo')
              }}
              onPaste={() => {
                console.log('todo')
              }}
              // onChange={(event) => {
              //               const { value } = event.target
              // TODO:
              // const odpUpdate = ODPs.updateNationalClass({ odp: originalDataPoint, index, field: 'name', value })
              // dispatch(OriginalDataPointActions.updateODP({ odp: odpUpdate }))
              // }}
              // onPaste={(event) => {
              // TODO:
              // dispatch(
              // OriginalDataPointActions.pasteNationalClass({
              //   odp: originalDataPoint,
              //   event,
              //   colIndex: 0,
              //   rowIndex: index,
              //   columns,
              //   allowGrow: true,
              // })
              // )
              //              }}
              disabled={!canEditData}
            />
          )}

          {/* placeHolder-rows can't be removed */}
          {!placeHolder && canEditData && !printView && (
            <button
              type="button"
              className="odp__nc-table__remove"
              onClick={() => {
                // TODO:
                // const odpUpdate = ODPs.deleteNationalClass({ odp: originalDataPoint, index })
                // dispatch(OriginalDataPointActions.updateODP({ odp: odpUpdate }))
              }}
            >
              <Icon name="remove" />
            </button>
          )}
        </div>
      </td>

      <td className="fra-table__cell-left odp__nc-table__def">
        <VerticallyGrowingTextField
          value={definition || ''}
          onChange={() => {
            console.log('todo')
          }}
          onPaste={() => {
            console.log('todo')
          }}
          // onChange={(event) => {
          //  const { value } = event.target
          // TODO:
          // const odpUpdate = ODPs.updateNationalClass({ odp: originalDataPoint, index, field: 'definition', value })
          // dispatch(OriginalDataPointActions.updateODP({ odp: odpUpdate }))
          // }}
          // onPaste={(event) => {
          // TODO:
          // dispatch(
          //   OriginalDataPointActions.pasteNationalClass({
          //     odp: originalDataPoint,
          //     event,
          //     colIndex: 1,
          //     rowIndex: index,
          //     columns,
          //     allowGrow: true,
          //   })
          // )
          // }}
          disabled={printView || !canEditData}
        />
      </td>

      {!printView && canEditData && (
        <td className="fra-table__row-anchor-cell">
          {!placeHolder && !Objects.isNil(originalDataPoint.odpId) && (
            <div className="odp__review-indicator-row-anchor">
              {/* <ReviewIndicator */}
              {/*  section="odp" */}
              {/*  title={i18n.t('nationalDataPoint.nationalClasses')} */}
              {/*  target={[ */}
              {/*    originalDataPoint.odpId, */}
              {/*    'class', */}
              {/*    `${originalDataPoint.nationalClasses[index].uuid}`, */}
              {/*    'definition', */}
              {/*  ]} */}
              {/*  countryIso={countryIso} */}
              {/* /> */}
            </div>
          )}
        </td>
      )}
    </tr>
  )
}

export default NationalClass
