import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { DataSourceDescription } from 'meta/assessment/description'
import { DataSourceLinked } from 'meta/assessment/descriptionValue/dataSource'

import { LinkedDataSourcesActions } from 'client/store/data/linkedDataSources/actions'
import { useDataSourcesLinked } from 'client/store/data/linkedDataSources/hooks/linkedDataSources'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Props = {
  meta?: DataSourceDescription
  sectionName: string
}

type Returned = {
  dataSourcesLinked?: Array<DataSourceLinked>
}

export const useGetDataSourcesLinked = (props: Props): Returned => {
  const { meta, sectionName } = props

  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const linkedDataSources = useDataSourcesLinked({ sectionName })

  useEffect(() => {
    const linkedVariables = meta?.linkedVariables ?? []

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
  }, [assessmentName, countryIso, cycleName, dispatch, meta?.linkedVariables, sectionName])

  return { dataSourcesLinked: linkedDataSources }
}
