import { useEffect } from 'react'

import { CountryIso } from 'meta/area'
import { DataSourceLinked } from 'meta/assessment'
import { NationalDataDescription } from 'meta/assessment/description'

import { useAppDispatch } from 'client/store'
import { DataActions, useDataSourcesLinked } from 'client/store/data'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  nationalData: NationalDataDescription
  sectionName: string
}

type Returned = {
  dataSourcesLinked?: Array<DataSourceLinked>
}

export const useGetDataSourcesLinked = (props: Props): Returned => {
  const { nationalData, sectionName } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const linkedDataSources = useDataSourcesLinked({ sectionName })

  useEffect(() => {
    const linkedVariables = nationalData?.dataSources?.linkedVariables ?? []

    if (linkedVariables.length) {
      dispatch(
        DataActions.getLinkedDataSources({ assessmentName, cycleName, countryIso, sectionName, linkedVariables })
      )
    }
  }, [assessmentName, countryIso, cycleName, dispatch, nationalData?.dataSources?.linkedVariables, sectionName])

  return { dataSourcesLinked: linkedDataSources }
}
