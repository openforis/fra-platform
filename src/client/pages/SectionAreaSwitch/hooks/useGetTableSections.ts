import { useEffect } from 'react'

import { useAppDispatch } from 'client/store/hooks'
import { MetaActions } from 'client/store/meta/actions'
import { useTableSections } from 'client/store/meta/hooks/tableSections'
import { useSectionRouteParams } from 'client/hooks/routeParams'

export const useGetTableSections = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()
  const tableSections = useTableSections({ sectionName })

  useEffect(() => {
    // Fetch sections if the current section is empty
    if (tableSections.length < 1) {
      const sectionNames = [sectionName]
      dispatch(MetaActions.getTableSections({ assessmentName, cycleName, sectionNames }))
    }
  }, [assessmentName, cycleName, dispatch, sectionName, tableSections.length])
}
