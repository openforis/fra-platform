import { useEffect } from 'react'

import { ExplorerMetadata } from 'meta/explorer/metadata'
import { Objects } from 'utils/objects'

import { ExplorerMetadataActions } from 'client/store/explorer/metadata/actions/index'
import { ExplorerMetadataSelectors } from 'client/store/explorer/metadata/selectors/index'
import { useAppDispatch, useAppSelector } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'

export const useExplorerSectionMetadata = (): ExplorerMetadata => {
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  return useAppSelector((state) =>
    ExplorerMetadataSelectors.getSectionMetadata(state, assessmentName, cycleName, sectionName)
  )
}

export const useGetExplorerSectionMetadata = (): void => {
  const dispatch = useAppDispatch()

  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()
  const explorerSectionMetadata = useExplorerSectionMetadata()
  const metadataExists = !Objects.isEmpty(explorerSectionMetadata)

  useEffect(() => {
    if (!metadataExists) {
      dispatch(
        ExplorerMetadataActions.getMetadata({
          assessmentName,
          cycleName,
          sectionNames: [sectionName],
        })
      )
    }
  }, [assessmentName, cycleName, dispatch, metadataExists, sectionName])
}
