import { useEffect } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { ExplorerMetadata } from 'meta/explorer/metadata'

import { ExplorerMetadataActions } from 'client/store/explorer/metadata/actions/index'
import { ExplorerMetadataSelectors } from 'client/store/explorer/metadata/selectors/index'
import { useAppDispatch, useAppSelector } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useExplorerSectionMetadata = (): ExplorerMetadata => {
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  return useAppSelector((state) =>
    ExplorerMetadataSelectors.getSectionMetadata(state, assessmentName, cycleName, sectionName)
  )
}

export const useGetExplorerSectionMetadata = () => {
  const dispatch = useAppDispatch()

  const { assessmentName, countryIso: _countryIso, cycleName, sectionName } = useSectionRouteParams()
  const countryIso = _countryIso as CountryIso
  const explorerSectionMetadata = useExplorerSectionMetadata()
  const metadataExists = !Objects.isEmpty(explorerSectionMetadata)

  useEffect(() => {
    if (!metadataExists) {
      dispatch(
        ExplorerMetadataActions.getMetadata({
          assessmentName,
          countryIso,
          cycleName,
          sectionNames: [sectionName],
        })
      )
    }
  }, [assessmentName, countryIso, cycleName, dispatch, metadataExists, sectionName])
}
