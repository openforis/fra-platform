import { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

import { MetadataActions } from '../slice'
import { useTableSections } from './useTableSections'

export const useGetTableSections = () => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()
  const tableSections = useTableSections({ sectionName })

  useEffect(() => {
    // Fetch sections if current section empty
    if (tableSections.length < 1) {
      const sectionNames = [sectionName]
      dispatch(MetadataActions.getTableSections({ assessmentName, cycleName, countryIso, sectionNames }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, sectionName, tableSections.length])
}
