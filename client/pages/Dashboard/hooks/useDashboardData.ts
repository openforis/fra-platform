import { useEffect } from 'react'

import { ApiEndPoint } from '@meta/api/endpoint'
import { Objects } from '@core/utils'

import { Areas } from '@meta/area'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useHomeCountriesFilter } from '@client/store/ui/home'
import { useCountryIso, useGetRequest } from '@client/hooks'

interface Props {
  variables: string[]
  columns: string[]
  tableNames: string[]
}

export default (props: Props) => {
  const { variables, columns, tableNames } = props
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const url = ApiEndPoint.CycleData.Table.tableData()
  const countriesFilter = useHomeCountriesFilter()
  const isIsoCountry = Areas.isISOCountry(countryIso)

  // If we are on 'Global' view and we have filtered countries
  const _level = Areas.isGlobal(countryIso) && !Objects.isEmpty(countriesFilter) ? countriesFilter : [countryIso]

  const {
    data,
    dispatch: fetchData,
    loaded,
  } = useGetRequest(url, {
    params: {
      countryIso,
      assessmentName: assessment.props.name,
      cycleName: cycle.name,
      tableNames,
      variables,
      columns,
      countryISOs: _level,
      mergeOdp: isIsoCountry,
      aggregate: !isIsoCountry,
    },
  })

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryIso])

  return {
    data,
    loaded,
  }
}
