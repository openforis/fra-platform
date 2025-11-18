import { ExtraEstimation } from 'meta/geo/extraEstimation/extraEstimation'
import { extraEstimationsMetadata } from 'meta/geo/extraEstimation/metadata'
import { ForestEstimationEntry } from 'meta/geo/forest/estimationEntry'
import { ForestEstimations, ForestEstimationsData } from 'meta/geo/forest/estimations'
import { ForestKey } from 'meta/geo/forest/key'
import { forestLayersMetadata } from 'meta/geo/forest/layersMetadata'
import { hansenPercentages } from 'meta/geo/hansen'

/**
 * Turns the Forest Estimations object into a table, and adds the area reported
 * to FRA and the recipe layer estimation as rows.
 *
 * @param {ForestEstimations} fetchedForestEstimations Forest Estimations object.
 * @public
 */
export const buildForestEstimationsDataTable = (
  fetchedForestEstimations: ForestEstimations
): Array<ForestEstimationEntry> => {
  const estimationsData: Array<ForestEstimationEntry> = []
  const fra1ALandArea = fetchedForestEstimations.data.fra1aLandArea
  const reportedFra1aForestArea = fetchedForestEstimations.data.fra1aForestArea

  const _calculateSourcePercent = (area: number): number => {
    if (fra1ALandArea === 0) return 0
    return Number(((area * 100) / (fra1ALandArea * 1000)).toFixed(2))
  }

  Object.keys(forestLayersMetadata).forEach((key: ForestKey) => {
    const metadata = forestLayersMetadata[key]

    if (!('forestAreaDataProperty' in metadata)) return

    if (key !== ForestKey.Hansen) {
      const sourceLabelKey = metadata.titleKey ?? key
      const area = fetchedForestEstimations.data[
        metadata.forestAreaDataProperty as keyof ForestEstimationsData
      ] as number

      if (typeof area === 'undefined') return

      estimationsData.push({
        area: Number(area.toFixed(2)),
        fra1ALandAreaPercentage: _calculateSourcePercent(area),
        sourceKey: key,
        sourceLabelKey,
      })
    } else {
      hansenPercentages.forEach((number: number) => {
        const sourceLabelKey = 'geo.sections.forest.layerTitles.hansenGfc2020WithPercent'
        const area = fetchedForestEstimations.data[
          (metadata.forestAreaDataProperty + number) as keyof ForestEstimationsData
        ] as number

        if (typeof area === 'undefined') return

        estimationsData.push({
          area: Number(area.toFixed(2)),
          fra1ALandAreaPercentage: _calculateSourcePercent(area),
          hansenPercent: number,
          sourceKey: key,
          sourceLabelKey,
        })
      })
    }
  })

  // Adding the reported Forest Area to the data.
  const reportedToFraLabelKey = extraEstimationsMetadata[ExtraEstimation.ReportedToFRA2020].titleKey
  const reportedFra1aForestAreaHa = reportedFra1aForestArea * 1000 // Normalize to Ha. Instead of Thousands of Ha.
  estimationsData.push({
    area: reportedFra1aForestAreaHa,
    fra1ALandAreaPercentage: _calculateSourcePercent(reportedFra1aForestAreaHa),
    sourceKey: ExtraEstimation.ReportedToFRA2020,
    sourceLabelKey: reportedToFraLabelKey,
  })

  return estimationsData
}
