import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName, Table } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useHistoryLastApprovedIsActive, useOriginalDataPointYears } from 'client/store/data'
import { useLastApprovedHistoryTableData } from 'client/store/data/hooks/useLastApprovedHistoryTableData'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { ODPYear } from '../types'

type Props = {
  assessmentName: AssessmentName
  table: Table
}

export const useOriginalDataPointYearsWithHistory = (props: Props): Array<ODPYear> => {
  const { assessmentName, table } = props
  const { name: tableName, odp } = table.props

  const { cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const odpYears = useOriginalDataPointYears()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const data = useLastApprovedHistoryTableData()

  return useMemo<Array<ODPYear>>(() => {
    const _odpYears = odpYears ?? []

    if (historyLastApprovedIsActive && odp) {
      const odpYearsMap = _odpYears.reduce<Record<string, ODPYear>>(
        (acc, odpYear) => ({ ...acc, [odpYear.year]: odpYear }),
        {}
      )
      const tableData = RecordAssessmentDatas.getTableData({ assessmentName, cycleName, countryIso, tableName, data })
      Object.entries(tableData).forEach(([year, value]) => {
        const nodeValues = Object.values(value)
        if (nodeValues.some((v) => !Objects.isNil(v.odpId)) && !odpYearsMap[year]) {
          odpYearsMap[year] = { year, id: undefined }
        }
      })
      return Object.values(odpYearsMap)
    }

    return _odpYears
  }, [assessmentName, countryIso, cycleName, data, historyLastApprovedIsActive, odp, odpYears, tableName])
}
