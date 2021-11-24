import React from 'react'
import { useDispatch } from 'react-redux'

import { ODP, ODPs } from '@core/odp'
import { useI18n } from '../../../hooks'
import { useIsAutoSaveSaving } from '../../../store/autosave'
import { usePrintView } from '../../../store/app'

import { OriginalDataPointActions } from '../../../store/page/originalDataPoint'
import NationalClass from './NationalClass'

type Props = {
  canEditData: boolean
  odp: ODP
}

const NationalClasses: React.FC<Props> = (props) => {
  const { canEditData, odp } = props
  const { nationalClasses, id, year } = odp

  const dispatch = useDispatch()
  const i18n = useI18n()
  const [printView] = usePrintView()
  const saving = useIsAutoSaveSaving()
  const copyDisabled = !id || !year || !ODPs.canCopyPreviousValues(odp) || saving

  return (
    <div className="odp__section">
      {!printView && (
        <div className="odp__section-header">
          <h3 className="subhead">{i18n.t('nationalDataPoint.nationalClasses')}</h3>
          {canEditData && (
            <button
              type="button"
              className="btn-s btn-primary btn-copy-prev-values"
              disabled={copyDisabled}
              onClick={() => dispatch(OriginalDataPointActions.copyPreviousNationalClasses({ id: odp.id }))}
            >
              {i18n.t('nationalDataPoint.copyPreviousValues')}
            </button>
          )}
        </div>
      )}

      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <table className="fra-table odp__nc-table">
            <tbody>
              <tr>
                {printView && (
                  <th className="fra-table__header-cell odp__year-column" rowSpan={nationalClasses.length + 1}>
                    {odp.year}
                  </th>
                )}
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.nationalClass')}</th>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.definition')}</th>
              </tr>
              {nationalClasses.map((nationalClass, idx) => (
                <NationalClass key={nationalClass.uuid} index={idx} odp={odp} canEditData={canEditData} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default NationalClasses
