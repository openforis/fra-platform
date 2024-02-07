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
  const data = useRecordAssessmentData()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const tableNames = [TableNames.climaticDomain]
    const propsFetch = { assessmentName, countryIso, cycleName, tableNames }
    dispatch(DataActions.getTableData(propsFetch))
  }, [assessmentName, countryIso, cycleName, dispatch])

  return useMemo<Returned>(() => {
    const domains = ['boreal', 'temperate', 'tropical', 'sub_tropical']
    const countryDomain = country?.props?.domain ?? domains[0]
    const defaultDomains = { domains, defaultSelectedDomain: countryDomain }

    const tableName = TableNames.climaticDomain
    const propsGetData = { assessmentName, cycleName, tableName, data, countryIso }
    const climaticDomainTableData = RecordAssessmentDatas.getTableData(propsGetData)

    let overrideColumnAvailable = true
    if (Objects.isEmpty(climaticDomainTableData?.percentOfForestArea2015)) overrideColumnAvailable = false

    const allRawValuesEmpty = Object.values(climaticDomainTableData?.percentOfForestArea2015 || {}).every((entry) =>
      Objects.isEmpty(entry?.raw)
    )
    if (allRawValuesEmpty) overrideColumnAvailable = false

    if (!overrideColumnAvailable && Objects.isEmpty(climaticDomainTableData?.percentOfForestArea2015Default))
      return defaultDomains

    const customSort = (domainA: string, domainB: string): number => {
      const getRawValue = (domain: string): number => {
        const climaticDomainColumn = overrideColumnAvailable
          ? climaticDomainTableData.percentOfForestArea2015
          : climaticDomainTableData.percentOfForestArea2015Default
        return parseFloat(climaticDomainColumn[domain]?.raw) || 0
      }

      return getRawValue(domainB) - getRawValue(domainA)
    }
    const sortedDomains = domains.sort(customSort)

    return { domains: sortedDomains, defaultSelectedDomain: sortedDomains[0] }
  }, [assessmentName, country?.props?.domain, countryIso, cycleName, data])
}
