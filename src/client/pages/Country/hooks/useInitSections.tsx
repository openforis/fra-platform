import { useEffect } from 'react'

import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store/hooks'
import { MetaActions } from 'client/store/meta/actions'
import { useSections } from 'client/store/meta/hooks/sections'
import { useCycleRouteParams } from 'client/hooks/routeParams'

export const useInitSections = (): void => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  const dispatch = useAppDispatch()
  const sections = useSections()

  useEffect(() => {
    if (Objects.isEmpty(sections)) {
      dispatch(MetaActions.getSections({ assessmentName, cycleName }))
    }
  }, [assessmentName, cycleName, dispatch, sections])
}
