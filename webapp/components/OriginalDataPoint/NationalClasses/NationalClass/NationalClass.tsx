import React from 'react'
import { useDispatch } from 'react-redux'

import { ODP, ODPs } from '@core/odp'
import { Objects } from '@core/utils'
import { saveDraft, pasteNationalClassValues } from '@webapp/sectionSpec/fra/originalDataPoint/actions'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import { usePrintView } from '@webapp/store/app'

import Icon from '@webapp/components/icon'
import VerticallyGrowingTextField from '@webapp/components/verticallyGrowingTextField'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useNationalClassNameComments, useNationalClassValidation } from '../../hooks'

const nationalClassCols = [
  { name: 'className', type: 'text' },
  { name: 'definition', type: 'text' },
]

type Props = {
  canEditData: boolean
  index: number
  odp: ODP
}

const NationalClass: React.FC<Props> = (props) => {
  const { odp, index, canEditData } = props

  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const [printView] = usePrintView()

  const nationalClass = odp.nationalClasses[index]
  const { className, definition, uuid, placeHolder } = nationalClass
  const target = [odp.odpId, 'class', `${uuid}`, 'definition']
  const classNameRowComments = useNationalClassNameComments(target)
  const validation = useNationalClassValidation(index)

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
              onChange={(event) => {
                const { value } = event.target
                const odpUpdate = ODPs.updateNationalClass({ odp, index, field: 'className', value })
                dispatch(saveDraft(countryIso, odpUpdate))
              }}
              onPaste={(event) => {
                dispatch(
                  pasteNationalClassValues({
                    event,
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

          {/* placeHolder-rows can't be removed */}
          {!placeHolder && canEditData && !printView && (
            <button
              type="button"
              className="odp__nc-table__remove"
              onClick={() => {
                const odpUpdate = ODPs.deleteNationalClass({ odp, index })
                dispatch(saveDraft(countryIso, odpUpdate))
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
          onChange={(event) => {
            const { value } = event.target
            const odpUpdate = ODPs.updateNationalClass({ odp, index, field: 'definition', value })
            dispatch(saveDraft(countryIso, odpUpdate))
          }}
          onPaste={(event) => {
            dispatch(
              pasteNationalClassValues({
                event,
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
          {!placeHolder && !Objects.isNil(odp.odpId) && (
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

export default NationalClass
