import { CountryIso } from 'meta/area/countryIso'
import { DataSourceLinked } from 'meta/assessment/descriptionValue/dataSource'
import { SectionName } from 'meta/assessment/section'

import { LinkedDataSourcesSelectors } from 'client/store/data/linkedDataSources/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Props = { sectionName: SectionName }

export const useDataSourcesLinked = (props: Props): Array<DataSourceLinked> | undefined => {
  const { sectionName } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) =>
    LinkedDataSourcesSelectors.getLinkedDataSources(state, assessmentName, cycleName, countryIso, sectionName)
  )
}
