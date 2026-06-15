import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { SectionName } from 'meta/assessment/section'

import { DescriptionsActions } from 'client/store/data/descriptions/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { DataSourceOnDelete } from 'client/components/DataSources/types'

type Props = {
  sectionName: SectionName
}

export const useOnDelete = (props: Props): DataSourceOnDelete => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useCallback<DataSourceOnDelete>(
    (dataSource) => {
      const deleteProps = { assessmentName, cycleName, countryIso, sectionName, uuid: dataSource.uuid }
      dispatch(DescriptionsActions.deleteDataSource(deleteProps))
    },
    [assessmentName, countryIso, cycleName, dispatch, sectionName]
  )
}
