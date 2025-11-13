import { useEffect, useRef } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { Assessments } from 'meta/assessment/assessments'
import { SectionName } from 'meta/assessment/section'
import { RecordAssessmentData } from 'meta/data/recordData'
import { Dimensions } from 'meta/measurement/dimensions'
import { Measures } from 'meta/measurement/measures'

import { ExplorerDataActions } from 'client/store/explorer/data/actions'
import { ExplorerDataSelectors } from 'client/store/explorer/data/selectors'
import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { useExplorerCountries } from 'client/store/explorer/selection/hooks/countries'
import { useExplorerDimensions } from 'client/store/explorer/selection/hooks/dimensions'
import { useExplorerMeasures } from 'client/store/explorer/selection/hooks/measures'
import { useAppDispatch, useAppSelector } from 'client/store/hooks'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useSectionRouteParams } from 'client/hooks/routeParams'

export const useExplorerSectionData = (): RecordAssessmentData => {
  const { sectionName } = useSectionRouteParams()

  return useAppSelector((state) => ExplorerDataSelectors.getSectionData(state, sectionName))
}

export const useGetExplorerSectionData = (): void => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const { cellsExportAlways, tableName } = useExplorerSectionMetadata() ?? {}
  const countryISOs = useExplorerCountries()
  const dimensions = useExplorerDimensions()
  const measures = useExplorerMeasures()
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()

  const explorerSectionData = useExplorerSectionData()

  const dataExists = !Objects.isEmpty(explorerSectionData)
  const lastPropsBySectionRef = useRef<Record<SectionName, string>>({})
  const lastPublishedCycle = Assessments.getLastPublishedCycle(assessment)
  const fetchLastPublished = cycleName === lastPublishedCycle?.name

  useEffect(() => {
    if ([countryISOs, dimensions, measures, tableName].some(Objects.isEmpty)) return

    const measuresExportAlways = Measures.getExportAlways(cellsExportAlways)
    const dimensionsExportAlways = Dimensions.getExportAlways(cellsExportAlways)

    const getDataProps = {
      assessmentName,
      countryIso,
      countryISOs,
      cycleName,
      dimensions: [...dimensions, ...dimensionsExportAlways],
      measures: [...measures, ...measuresExportAlways],
      sectionName,
      tableName,
    }
    const currentPropsJson = JSON.stringify(getDataProps)
    const lastPropsJson = lastPropsBySectionRef.current[sectionName]

    // Prevent re-fetching data when navigating between sections
    if (dataExists && lastPropsJson === currentPropsJson) {
      return
    }

    dispatch(ExplorerDataActions.getData({ ...getDataProps, fetchLastPublished }))
    lastPropsBySectionRef.current[sectionName] = currentPropsJson
  }, [
    assessmentName,
    cellsExportAlways,
    countryIso,
    countryISOs,
    cycleName,
    dataExists,
    dimensions,
    dispatch,
    fetchLastPublished,
    measures,
    sectionName,
    tableName,
  ])
}
