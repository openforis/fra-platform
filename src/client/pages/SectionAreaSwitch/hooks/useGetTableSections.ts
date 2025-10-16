import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store/hooks'
import { MetaActions } from 'client/store/meta/actions'
import { useTableSections } from 'client/store/meta/hooks/tableSections'
import { useSectionRouteParams } from 'client/hooks/routeParams'

export const useGetTableSections = () => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()
  const tableSections = useTableSections({ sectionName })

  useEffect(() => {
    // Fetch sections if the current section is empty
    if (tableSections.length < 1) {
      const sectionNames = [sectionName]
      dispatch(MetaActions.getTableSections({ assessmentName, cycleName, countryIso, sectionNames }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, sectionName, tableSections.length])
}
