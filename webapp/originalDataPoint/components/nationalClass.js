import React from 'react'

import Icon from '../../reusableUiComponents/icon'
import VerticallyGrowingTextField from '../../reusableUiComponents/verticallyGrowingTextField'
import ReviewIndicator from '../../review/reviewIndicator'

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
    printView
  } = props

  return (
    <tr
      className={`${isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'definition'], openThread) ? 'fra-row-comments__open' : ''}`}>
      <td
        className={`fra-table__cell-left odp__nc-table__name ${getValidationStatusRow(odp, index).validClassName === false ? 'error' : ''}`}>
        <div className="odp__nc-table__input-container">
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
            disabled={printView}
          />
          {
            placeHolder || printView
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
          disabled={printView}
        />
      </td>

      {
        !printView &&
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

