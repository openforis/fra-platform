import React from 'react'

import Icon from '@webapp/components/icon'
import VerticallyGrowingTextField from '@webapp/components/verticallyGrowingTextField'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'

import * as originalDataPoint from '../originalDataPoint'

const nationalClassCols = [{ name: 'className', type: 'text' }, { name: 'definition', type: 'text' }]

import { isCommentsOpen, getValidationStatusRow, updatePastedValues } from './commonFunctions'

const NationalClass = props => {

  const {
    odp,
    index,
    saveDraft,
    countryIso,
    className,
    definition,
    placeHolder,
    openThread,
    i18n,
    printView,
    canEditData
  } = props

  return (
    <tr
      className={`${isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'definition'], openThread) ? 'fra-row-comments__open' : ''}`}>
      <td
        className={`fra-table__cell-left odp__nc-table__name ${getValidationStatusRow(odp, index).validClassName === false ? 'error' : ''}`}>
        <div className="odp__nc-table__input-container">
          {
            printView
              ? (
                <div className="text-input__readonly-view only-print"
                     style={{ paddingTop: 0, paddingBottom: 0 }}>
                  {className || ''}
                </div>
              )
              : (
                <input
                  className="odp__nc-table__input validation-error-sensitive-field"
                  type="text"
                  placeholder={placeHolder && index === 0 ? i18n.t('nationalDataPoint.enterOrCopyPasteNationalClasses') : ''}
                  value={className || ''}
                  onChange={(evt) =>
                    saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, 'className', evt.target.value))}
                  onPaste={updatePastedValues({
                    odp,
                    countryIso,
                    rowIndex: index,
                    colIndex: 0,
                    columns: nationalClassCols,
                    saveDraft,
                    allowGrow: true
                  })}
                  disabled={printView || !canEditData}
                />
              )
          }
          {
            placeHolder || !canEditData || printView
              ? null //placeHolder-rows can't be removed
              : <div
                className="odp__nc-table__remove"
                onClick={(evt) => saveDraft(countryIso, originalDataPoint.removeNationalClass(odp, index))}>
                <Icon name="remove"/>
              </div>
          }
        </div>
      </td>
      <td className="fra-table__cell-left odp__nc-table__def">
        <VerticallyGrowingTextField
          value={definition || ''}
          onChange={(evt) =>
            saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, 'definition', evt.target.value))}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 1,
            columns: nationalClassCols,
            saveDraft,
            allowGrow: true
          })}
          disabled={printView || !canEditData}
        />
      </td>

      {
        !printView && canEditData &&
        <td className="fra-table__row-anchor-cell">
          {placeHolder || !odp.odpId
            ? null
            : <div className="odp__review-indicator-row-anchor">
              <ReviewIndicator
                section='odp'
                title={i18n.t('nationalDataPoint.nationalClasses')}
                target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'definition']}
                countryIso={countryIso}/>
            </div>
          }
        </td>
      }

    </tr>
  )
}

export default NationalClass

