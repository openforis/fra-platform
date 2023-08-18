import { useEffect } from 'react'

import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store'
import { MetadataActions, useSections } from 'client/store/metadata'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useInitSections = () => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  const dispatch = useAppDispatch()
  const sections = useSections()

  useEffect(() => {
    if (Objects.isEmpty(sections)) {
      dispatch(MetadataActions.getSections({ assessmentName, cycleName }))
    }
  }, [assessmentName, cycleName, dispatch, sections])
}
