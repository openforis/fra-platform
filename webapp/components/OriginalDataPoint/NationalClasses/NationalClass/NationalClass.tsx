import React from 'react'
import { useDispatch } from 'react-redux'

import { ODP, ODPs } from '@core/odp'
import { Objects } from '@core/utils'
import { useCountryIso, useI18n } from '@webapp/hooks'
import { usePrintView } from '@webapp/store/app'

import Icon from '@webapp/components/icon'
import VerticallyGrowingTextField from '@webapp/components/verticallyGrowingTextField'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { OriginalDataPointActions } from '@webapp/store/page/originalDataPoint'
import { readPasteClipboard } from '@webapp/utils/copyPasteUtil'
import handlePaste from '@webapp/sectionSpec/fra/originalDataPoint/paste'
import { useNationalClassNameComments, useNationalClassValidation } from '../../hooks'

const columns = [
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
  const { name, definition, uuid, placeHolder } = nationalClass
  const target = [odp.odpId, 'class', `${uuid}`, 'definition']
  const classNameRowComments = useNationalClassNameComments(target)
  const validation = useNationalClassValidation(index)

  const onPaste = (props: {
    event: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>
    colIndex: number
  }) => {
    const { event, colIndex } = props
    const allowedClass = () => true
    const rawPastedData = readPasteClipboard(event, 'string')
    const { updatedOdp } = handlePaste(columns, allowedClass, odp, true, rawPastedData, index, colIndex)
    dispatch(OriginalDataPointActions.updateODP({ odp: updatedOdp }))
  }

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
              onChange={(event) => {
                const { value } = event.target
                const odpUpdate = ODPs.updateNationalClass({ odp, index, field: 'name', value })
                dispatch(OriginalDataPointActions.updateODP({ odp: odpUpdate }))
              }}
              onPaste={(event) => {
                onPaste({ event, colIndex: 0 })
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
                dispatch(OriginalDataPointActions.updateODP({ odp: odpUpdate }))
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
            dispatch(OriginalDataPointActions.updateODP({ odp: odpUpdate }))
          }}
          onPaste={(event) => {
            onPaste({ event, colIndex: 1 })
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
