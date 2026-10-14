import { useEffect } from 'react'

import { useAppDispatch } from 'client/store/hooks'
import { MetaActions } from 'client/store/meta/actions'
import { useSections } from 'client/store/meta/hooks/sections'
import { useCycleRouteParams } from 'client/hooks/routeParams'

export const useGetTableSections = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const sections = useSections()

  useEffect(() => {
    if (sections) {
      const sectionNames = Object.values(sections).flatMap((section) =>
        Object.values(section.subSections).flatMap((sectionItem) => sectionItem.props.name)
      )

      dispatch(MetaActions.getTableSections({ assessmentName, cycleName, sectionNames }))
    }
  }, [assessmentName, cycleName, dispatch, sections])
}
