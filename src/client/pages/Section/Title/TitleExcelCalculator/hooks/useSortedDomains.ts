import { useEffect, useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { TableNames } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useAppDispatch } from 'client/store'
import { useCountry } from 'client/store/area'
import { DataActions, useRecordAssessmentData } from 'client/store/data'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Returned = {
  domains: Array<string>
  defaultSelectedDomain: string
}

export const useSortedDomains = (): Returned => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const country = useCountry(countryIso)
  const recordAssessmentData = useRecordAssessmentData()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const propsFetch = {
      assessmentName,
      countryIso,
      cycleName,
      tableNames: [TableNames.climaticDomain],
    }
    dispatch(DataActions.getTableData(propsFetch))
  }, [assessmentName, countryIso, cycleName, dispatch])

  const climaticDomainTableData = RecordAssessmentDatas.getTableData({
    assessmentName,
    cycleName,
    tableName: TableNames.climaticDomain,
    data: recordAssessmentData,
    countryIso,
  })

  return useMemo<Returned>(() => {
    const domains = ['boreal', 'temperate', 'tropical', 'subtropical']
    const countryDomain = country?.props?.domain ?? domains[0]
    const defaultDomains = { domains, defaultSelectedDomain: countryDomain }

    if (Objects.isEmpty(climaticDomainTableData?.percentOfForestArea2015)) return defaultDomains

    const allRawValuesEmpty = Object.values(climaticDomainTableData.percentOfForestArea2015).every((entry) =>
      Objects.isEmpty(entry?.raw)
    )
    if (allRawValuesEmpty) return defaultDomains

    const customSort = (domainA: string, domainB: string): number => {
      const getRawValue = (domain: string): number => {
        return (
          parseFloat(
            climaticDomainTableData.percentOfForestArea2015[domain === 'subtropical' ? 'sub_tropical' : domain]?.raw
          ) || 0
        )
      }

      return getRawValue(domainB) - getRawValue(domainA)
    }
    const sortedDomains = domains.sort(customSort)

    return { domains: sortedDomains, defaultSelectedDomain: sortedDomains[0] }
  }, [climaticDomainTableData, country?.props?.domain])
}
