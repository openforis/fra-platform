import React from 'react'

import useCountryIso from '@webapp/components/hooks/useCountryIso'
import NationalClass from './nationalClass'

const NationalClasses = props => {

  const {
    saveDraft, autoSaving,
    odp, copyPreviousNationalClasses,
    copyDisabled, openThread, i18n,
    printView = false,
    canEditData
  } = props

  const countryIso = useCountryIso()
  const copyPreviousClassesDisabled = () => odp.year && !autoSaving ? false : true

  const nationalClasses = odp.nationalClasses

  return (
    <div className="odp__section">

      {
        !printView &&
        <div className="odp__section-header">
          <h3 className="subhead">
            {i18n.t('nationalDataPoint.nationalClasses')}
          </h3>
            {
            canEditData &&
              <button
                className="btn-s btn-primary btn-copy-prev-values"
                disabled={copyDisabled || copyPreviousClassesDisabled()}
                onClick={() => copyPreviousNationalClasses(countryIso, odp)}>
                {i18n.t('nationalDataPoint.copyPreviousValues')}
              </button>
            }
        </div>
      }

      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <table className="fra-table odp__nc-table">
            <tbody>

            <tr>
              {
                printView &&
                <th className="fra-table__header-cell odp__year-column"
                    rowSpan={nationalClasses.length + 1}>
                  {odp.year}
                </th>
              }
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.nationalClass')}</th>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.definition')}</th>
            </tr>
            {
              nationalClasses.map((nationalClass, i) => (
                <NationalClass
                  key={i}
                  index={i}
                  odp={odp}
                  saveDraft={saveDraft}
                  countryIso={countryIso}
                  openThread={openThread}
                  i18n={i18n}
                  printView={printView}
                  canEditData={canEditData}
                  {...nationalClass}
                />
              ))
            }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default NationalClasses
