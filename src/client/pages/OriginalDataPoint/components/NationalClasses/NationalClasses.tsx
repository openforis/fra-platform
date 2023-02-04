import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ODPs, OriginalDataPoint } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import {
  OriginalDataPointActions,
  useIsOriginalDataPointUpdating,
  useOriginalDataPointReservedYears,
} from '@client/store/ui/originalDataPoint'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'

import NationalClass from './NationalClass'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const NationalClasses: React.FC<Props> = (props) => {
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const { canEditData, originalDataPoint } = props
  const { nationalClasses, year } = originalDataPoint

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { print } = useIsPrint()
  const originalDataPointUpdating = useIsOriginalDataPointUpdating()
  const reservedYears = useOriginalDataPointReservedYears() ?? []
  const hasPreviousYear = Boolean(ODPs.getPreviousODPYear(year, reservedYears))
  const canCopy = ODPs.canCopyPreviousValues(originalDataPoint)
  // Copying is disabled if: nationalClass(1+) exist, odp doesn't have a year or there is no previous year
  const copyDisabled = !canCopy || !year || year === -1 || originalDataPointUpdating || !hasPreviousYear

  const onCopyClick = useCallback(() => {
    dispatch(
      OriginalDataPointActions.copyPreviousNationalClasses({
        originalDataPoint,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        countryIso,
      })
    )
  }, [assessment.props.name, countryIso, cycle.name, dispatch, originalDataPoint])

  return (
    <div className="odp__section">
      {!print && (
        <div className="odp__section-header">
          <h3 className="subhead">
            {t(`nationalDataPoint.${cycle.name === '2025' ? 'nationalClassifications' : 'nationalClasses'}`)}
          </h3>
          {canEditData && (
            <button
              type="button"
              className="btn-s btn-primary btn-copy-prev-values"
              disabled={copyDisabled}
              onClick={onCopyClick}
            >
              {t('nationalDataPoint.copyPreviousValues')}
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
    </div>
  )
}

export default NationalClasses
