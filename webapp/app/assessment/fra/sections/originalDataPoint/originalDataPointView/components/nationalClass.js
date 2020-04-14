import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import Icon from '@webapp/components/icon'
import VerticallyGrowingTextField from '@webapp/components/verticallyGrowingTextField'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useCountryIso, useI18n, usePrintView } from '@webapp/components/hooks'

import * as originalDataPoint from '../../originalDataPoint'

import useClassNameComments from './useClassNameComments'
import useValidationNationalClass from './useValidationNationalClass'
import { saveDraft, pasteValues } from '../../actions'

const nationalClassCols = [
  { name: 'className', type: 'text' },
  { name: 'definition', type: 'text' },
]

const NationalClass = (props) => {
  const { odp, index, canEditData } = props
  const nationalClass = odp.nationalClasses[index]
  const { className, definition, uuid, placeHolder } = nationalClass
  const target = [odp.odpId, 'class', `${uuid}`, 'definition']

  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const [printView] = usePrintView()
  const classNameRowComments = useClassNameComments(target)
  const validation = useValidationNationalClass(index)

  return (
    <tr className={classNameRowComments}>
      <td className={`fra-table__cell-left odp__nc-table__name ${validation.validClassName === false ? 'error' : ''}`}>
        <div className="odp__nc-table__input-container">
          {printView ? (
            <div className="text-input__readonly-view only-print" style={{ paddingTop: 0, paddingBottom: 0 }}>
              {className || ''}
            </div>
          ) : (
            <input
              className="odp__nc-table__input validation-error-sensitive-field"
              type="text"
              placeholder={
                placeHolder && index === 0 ? i18n.t('nationalDataPoint.enterOrCopyPasteNationalClasses') : ''
              }
              value={className || ''}
              onChange={(evt) => {
                dispatch(
                  saveDraft(
                    countryIso,
                    originalDataPoint.updateNationalClass(odp, index, 'className', evt.target.value)
                  )
                )
              }}
              onPaste={(evt) => {
                dispatch(
                  pasteValues({
                    evt,
                    rowIndex: index,
                    colIndex: 0,
                    columns: nationalClassCols,
                    allowGrow: true,
                  })
                )
              }}
              disabled={!canEditData}
            />
          )}
          {placeHolder || !canEditData || printView ? null : ( // placeHolder-rows can't be removed
            <button
              type="button"
              className="odp__nc-table__remove"
              onClick={() => {
                dispatch(saveDraft(countryIso, originalDataPoint.removeNationalClass(odp, index)))
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
          onChange={(evt) => {
            dispatch(
              saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, 'definition', evt.target.value))
            )
          }}
          onPaste={(evt) => {
            dispatch(
              pasteValues({
                evt,
                rowIndex: index,
                colIndex: 1,
                columns: nationalClassCols,
                allowGrow: true,
              })
            )
          }}
          disabled={printView || !canEditData}
        />
      </td>

      {!printView && canEditData && (
        <td className="fra-table__row-anchor-cell">
          {placeHolder || !odp.odpId ? null : (
            <div className="odp__review-indicator-row-anchor">
              <ReviewIndicator
                section="odp"
                title={i18n.t('nationalDataPoint.nationalClasses')}
                target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'definition']}
                countryIso={countryIso}
              />
            </div>
          )}
        </td>
      )}
    </tr>
  )
}

NationalClass.propTypes = {
  canEditData: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  odp: PropTypes.object.isRequired,
}

export default NationalClass
