import { useEffect } from 'react'

import { CountryIso } from 'meta/area'
import { NationalDataDescription } from 'meta/assessment/description'
import { DataSourceLinked } from 'meta/assessment/descriptionValue'

import { LinkedDataSourcesActions } from 'client/store/data/linkedDataSources/actions'
import { useDataSourcesLinked } from 'client/store/data/linkedDataSources/hooks/linkedDataSources'
import { useAppDispatch } from 'client/store/hooks'
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
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const linkedDataSources = useDataSourcesLinked({ sectionName })

  useEffect(() => {
    const linkedVariables = nationalData?.dataSources?.linkedVariables ?? []

    if (linkedVariables.length) {
      dispatch(
        LinkedDataSourcesActions.getLinkedDataSources({
          assessmentName,
          cycleName,
          countryIso,
          sectionName,
          linkedVariables,
        })
      )
    }
  }, [assessmentName, countryIso, cycleName, dispatch, nationalData?.dataSources?.linkedVariables, sectionName])

  return { dataSourcesLinked: linkedDataSources }
}
