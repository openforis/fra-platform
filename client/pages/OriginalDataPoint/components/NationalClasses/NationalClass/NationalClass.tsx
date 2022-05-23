import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@core/utils'

import { ODPs, OriginalDataPoint } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { OriginalDataPointActions, useOriginalDataPoint } from '@client/store/pages/originalDataPoint'
import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'
import ReviewIndicator from '@client/components/ReviewIndicator'
import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'

import { useNationalClassNameComments, useNationalClassValidation } from '../../../hooks'

const columns = [
  { name: 'className', type: 'text' },
  { name: 'definition', type: 'text' },
]

type Props = {
  canEditData: boolean
  index: number
}

const NationalClass: React.FC<Props> = (props) => {
  const { index, canEditData } = props
  const originalDataPoint = useOriginalDataPoint()
  const { year } = originalDataPoint
  const disabled = !canEditData || !year
  const dispatch = useAppDispatch()
  const i18n = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const [printView] = [false] // usePrintView()

  const nationalClass = originalDataPoint.nationalClasses[index]
  const { name, definition, uuid, placeHolder } = nationalClass
  const target = [originalDataPoint.id, 'class', `${uuid}`, 'definition'] as string[]
  const classNameRowComments = useNationalClassNameComments(target)
  const validation = useNationalClassValidation(index)

  const updateOriginalDataPoint = (originalDataPointUpdate: OriginalDataPoint) => {
    dispatch(
      OriginalDataPointActions.updateOriginalDataPoint({
        countryIso,
        cycleName: cycle.name,
        assessmentName: assessment.props.name,
        originalDataPoint: originalDataPointUpdate,
      })
    )
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = event.target
                const originalDataPointUpdate = ODPs.updateNationalClass({
                  odp: originalDataPoint,
                  index,
                  field: 'name',
                  value,
                })
                updateOriginalDataPoint(originalDataPointUpdate)
              }}
              onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
                dispatch(
                  OriginalDataPointActions.pasteNationalClass({
                    odp: originalDataPoint,
                    event,
                    colIndex: 0,
                    rowIndex: index,
                    columns,
                    allowGrow: true,
                    assessmentName: assessment.props.name,
                    cycleName: cycle.name,
                  })
                )
              }}
              disabled={disabled}
            />
          )}

          {/* placeHolder-rows can't be removed */}
          {!placeHolder && canEditData && !printView && (
            <button
              type="button"
              className="odp__nc-table__remove"
              onClick={() => {
                const originalDataPointUpdate = ODPs.deleteNationalClass({ odp: originalDataPoint, index })
                updateOriginalDataPoint(originalDataPointUpdate)
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
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const { value } = event.target
            const originalDataPointUpdate = ODPs.updateNationalClass({
              odp: originalDataPoint,
              index,
              field: 'definition',
              value,
            })
            updateOriginalDataPoint(originalDataPointUpdate)
          }}
          onPaste={(event: React.ClipboardEvent<HTMLTextAreaElement>) => {
            dispatch(
              OriginalDataPointActions.pasteNationalClass({
                odp: originalDataPoint,
                event,
                colIndex: 1,
                rowIndex: index,
                columns,
                allowGrow: true,
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
          disabled={printView || disabled}
        />
      </td>

      {!printView && canEditData && !placeHolder && !Objects.isNil(originalDataPoint.id) && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            title={name}
            subtitle={i18n.t('nationalDataPoint.nationalDataPoint')}
            topicKey={`${originalDataPoint.id}-class-${originalDataPoint.nationalClasses[index].uuid}-definition`}
          />
        </td>
      )}
    </tr>
  )
}

export default NationalClass
