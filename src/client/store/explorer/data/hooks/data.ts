import { useEffect, useRef } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { SectionName } from 'meta/assessment/section'
import { RecordAssessmentData } from 'meta/data'

import { ExplorerDataActions } from 'client/store/explorer/data/actions'
import { ExplorerDataSelectors } from 'client/store/explorer/data/selectors'
import { useExplorerCountries } from 'client/store/explorer/filter/hooks/countries'
import { useExplorerDimensions } from 'client/store/explorer/filter/hooks/dimensions'
import { useExplorerMeasures } from 'client/store/explorer/filter/hooks/measures'
import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { useAppDispatch, useAppSelector } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useExplorerSectionData = (): RecordAssessmentData => {
  const { sectionName } = useSectionRouteParams()

  return useAppSelector((state) => ExplorerDataSelectors.getSectionData(state, sectionName))
}

export const useGetExplorerSectionData = () => {
  const dispatch = useAppDispatch()

  const { tableName } = useExplorerSectionMetadata() ?? {}
  const countryISOs = useExplorerCountries()
  const dimensions = useExplorerDimensions()
  const measures = useExplorerMeasures()
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()

  const explorerSectionData = useExplorerSectionData()

  const dataExists = !Objects.isEmpty(explorerSectionData)
  const lastPropsBySectionRef = useRef<Record<SectionName, string>>({})

  useEffect(() => {
    if ([countryISOs, dimensions, measures, tableName].some(Objects.isEmpty)) return

    const getDataProps = {
      assessmentName,
      countryIso,
      countryISOs,
      cycleName,
      dimensions,
      measures,
      sectionName,
      tableName,
    }
    const currentPropsJson = JSON.stringify(getDataProps)
    const lastPropsJson = lastPropsBySectionRef.current[sectionName]

    // Prevent re-fetching data when navigating between sections
    if (dataExists && lastPropsJson === currentPropsJson) {
      return
    }

    dispatch(ExplorerDataActions.getData(getDataProps))
    lastPropsBySectionRef.current[sectionName] = currentPropsJson
  }, [
    assessmentName,
    countryIso,
    countryISOs,
    cycleName,
    dataExists,
    dimensions,
    dispatch,
    measures,
    sectionName,
    tableName,
  ])
}
