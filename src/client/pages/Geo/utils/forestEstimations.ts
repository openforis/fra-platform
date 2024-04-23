import { createI18nPromise } from 'i18n/i18nFactory'

import {
  ExtraEstimation,
  extraEstimationsMetadata,
  ForestEstimations,
  ForestEstimationsData,
  ForestKey,
  forestLayersMetadata,
} from 'meta/geo'
import { hansenPercentages } from 'meta/geo/forest'
import { ForestEstimationEntry } from 'meta/geo/geoStatistics'
import { Lang } from 'meta/lang'

/**
 * Turns the Forest Estimations object into a table, and adds the area reported
 * to FRA and the recipe layer estimation as rows.
 *
 * @param {ForestEstimations} fetchedForestEstimations Forest Estimations object.
 * @param {Lang} language
 * @public
 */
export const builForestEstimationsDataTable = async (
  fetchedForestEstimations: ForestEstimations,
  language: Lang
): Promise<Array<ForestEstimationEntry>> => {
  const i18n = await createI18nPromise(language)
  if (!fetchedForestEstimations) throw Error(i18n.t('geo.statistics.dataUnavailable'))

  const estimationsData: Array<ForestEstimationEntry> = []
  const fra1ALandArea = fetchedForestEstimations.data.fra1aLandArea
  const reportedFra1aForestArea = fetchedForestEstimations.data.fra1aForestArea

  Object.keys(forestLayersMetadata).forEach((key: ForestKey) => {
    const metadata = forestLayersMetadata[key]

    if (!('forestAreaDataProperty' in metadata)) return

    if (key !== ForestKey.Hansen) {
      const sourceLabelKey = metadata.titleKey ?? key
      const area = fetchedForestEstimations.data[
        metadata.forestAreaDataProperty as keyof ForestEstimationsData
      ] as number

      if (typeof area === 'undefined') return

      const percentage = (area * 100) / (fra1ALandArea * 1000)
      estimationsData.push({
        area: Number(area.toFixed(2)),
        fra1ALandAreaPercentage: Number(percentage.toFixed(2)),
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

        const percentage = (area * 100) / (fra1ALandArea * 1000)
        estimationsData.push({
          area: Number(area.toFixed(2)),
          fra1ALandAreaPercentage: Number(percentage.toFixed(2)),
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
  const fra1aForestAreaPercentage = (reportedFra1aForestAreaHa * 100) / (fra1ALandArea * 1000)
  estimationsData.push({
    area: reportedFra1aForestAreaHa,
    fra1ALandAreaPercentage: Number(fra1aForestAreaPercentage.toFixed(2)),
    sourceKey: ExtraEstimation.ReportedToFRA2020,
    sourceLabelKey: reportedToFraLabelKey,
  })

  return estimationsData
}
