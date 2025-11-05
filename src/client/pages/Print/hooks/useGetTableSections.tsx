import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { useAppDispatch } from 'client/store/hooks'
import { MetaActions } from 'client/store/meta/actions'
import { useSections } from 'client/store/meta/hooks/sections'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useGetTableSections = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso: _countryIso, cycleName } = useCountryRouteParams()
  const sections = useSections()
  const countryIso = _countryIso as CountryIso

  useEffect(() => {
    if (sections) {
      const sectionNames = Object.values(sections).flatMap((section) =>
        Object.values(section.subSections).flatMap((sectionItem) => sectionItem.props.name)
      )

      dispatch(MetaActions.getTableSections({ assessmentName, cycleName, countryIso, sectionNames }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, sections])
}
