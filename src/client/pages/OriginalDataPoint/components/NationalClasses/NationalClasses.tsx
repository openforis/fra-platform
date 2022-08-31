import React from 'react'
// import { useAppDispatch } from '@client/store'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from '@meta/assessment'

import { useIsPrint } from '@client/hooks/useIsPath'

import NationalClass from './NationalClass'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const NationalClasses: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const { nationalClasses } = originalDataPoint
  // const { nationalClasses, id, year } = originalDataPoint

  // const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const { print } = useIsPrint()
  // const saving = false // TODO: useIsAutoSaveSaving()
  const copyDisabled = true // TODO: !id || !year || !ODPs.canCopyPreviousValues(originalDataPoint) || saving

  return (
    <div className="odp__section">
      {!print && (
        <div className="odp__section-header">
          <h3 className="subhead">{i18n.t<string>('nationalDataPoint.nationalClasses')}</h3>
          {canEditData && (
            <button
              type="button"
              className="btn-s btn-primary btn-copy-prev-values"
              disabled={copyDisabled}
              // onClick={() =>
              // TODO:
              // dispatch(OriginalDataPointActions.copyPreviousNationalClasses({ id: originalDataPoint.id }))
              // }
            >
              {i18n.t<string>('nationalDataPoint.copyPreviousValues')}
            </button>
          )}
        </div>
      )}

      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <table className="fra-table odp__nc-table">
            <tbody>
              <tr>
                {print && (
                  <th className="fra-table__header-cell odp__year-column" rowSpan={nationalClasses.length + 1}>
                    {originalDataPoint.year}
                  </th>
                )}
                <th className="fra-table__header-cell-left">{i18n.t<string>('nationalDataPoint.nationalClass')}</th>
                <th className="fra-table__header-cell-left">{i18n.t<string>('nationalDataPoint.definition')}</th>
              </tr>
              {nationalClasses.map((nationalClass, idx) => (
                <NationalClass
                  originalDataPoint={originalDataPoint}
                  key={nationalClass.uuid}
                  index={idx}
                  canEditData={canEditData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default NationalClasses
