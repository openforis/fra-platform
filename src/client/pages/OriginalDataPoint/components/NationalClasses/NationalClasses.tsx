import React, { useCallback, useState } from 'react'
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

  const [selectedPreviousYear, setSelectedPreviousYear] = useState<string>('')

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { print } = useIsPrint()
  const originalDataPointUpdating = useIsOriginalDataPointUpdating()
  const reservedYears = useOriginalDataPointReservedYears() ?? []
  const previousYears = year ? ODPs.getPreviousODPYears(year, reservedYears) : []

  const hasPreviousYears = Boolean(previousYears?.length > 0)
  const canCopy = ODPs.canCopyPreviousValues(originalDataPoint)
  // Copying is disabled if: nationalClass(1+) exist, odp doesn't have a year, there is no previous years or previous year is not selected
  const copyDisabled = !canCopy || !year || year === -1 || originalDataPointUpdating || !hasPreviousYears

  const onCopyClick = useCallback(() => {
    dispatch(
      OriginalDataPointActions.copyPreviousNationalClasses({
        originalDataPoint,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        countryIso,
        year: Number(selectedPreviousYear),
      })
    )
    setSelectedPreviousYear('')
  }, [assessment.props.name, countryIso, cycle.name, dispatch, originalDataPoint, selectedPreviousYear])

  return (
    <div className="odp__section">
      {!print && (
        <>
          <div className="odp__section-header">
            <h3 className="subhead">
              {t(`nationalDataPoint.${cycle.name === '2025' ? 'nationalClassifications' : 'nationalClasses'}`)}
            </h3>
          </div>

          {canEditData && (
            <div className="odp__previous-year-selection">
              <strong>{t('nationalDataPoint.prefillWith')}</strong>
              <select
                className="select"
                value={selectedPreviousYear}
                onChange={(e) => setSelectedPreviousYear(e.target.value)}
                disabled={copyDisabled}
              >
                <option value="">{t('nationalDataPoint.selectYear')}</option>
                {previousYears?.map((previousYear: number) => (
                  <option key={previousYear} value={previousYear}>
                    {previousYear}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn-s btn-primary btn-copy-prev-values"
                disabled={copyDisabled || selectedPreviousYear === ''}
                onClick={onCopyClick}
              >
                {t('nationalDataPoint.prefill')}
              </button>
            </div>
          )}
        </>
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
