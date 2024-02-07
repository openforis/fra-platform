import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { MetadataActions, useSections } from 'client/store/metadata'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useGetTableSections = () => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso: _countryIso } = useCountryRouteParams()
  const sections = useSections()
  const countryIso = _countryIso as CountryIso

  useEffect(() => {
    if (sections) {
      const sectionNames = Object.values(sections).flatMap((section) =>
        Object.values(section.subSections).flatMap((sectionItem) => sectionItem.props.name)
      )

      dispatch(MetadataActions.getTableSections({ assessmentName, cycleName, countryIso, sectionNames }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, sections])
}
