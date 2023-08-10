import React from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { useIsPrint } from 'client/hooks/useIsPath'

import NationalClass from './NationalClass'

export const NationalClassesTable = (props: { canEditData: boolean; originalDataPoint: OriginalDataPoint }) => {
  const { canEditData, originalDataPoint } = props
  const { nationalClasses, year } = originalDataPoint
  const cycle = useCycle()

  const { print } = useIsPrint()

  const { t } = useTranslation()

  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table odp__nc-table">
          <tbody>
            <tr>
              {print && (
                <th className="fra-table__header-cell odp__year-column" rowSpan={nationalClasses.length + 1}>
                  {year}
                </th>
              )}
              <th className="fra-table__header-cell-left">
                {t(`nationalDataPoint.${cycle.name === '2025' ? 'nationalClassifications' : 'nationalClass'}`)}
              </th>
              <th className="fra-table__header-cell-left">{t('nationalDataPoint.definition')}</th>
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
  )
}
