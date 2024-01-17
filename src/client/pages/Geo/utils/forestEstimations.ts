import { ExtraEstimation, ForestEstimations, ForestEstimationsData, ForestKey, forestLayersMetadata } from 'meta/geo'
import { hansenPercentages } from 'meta/geo/forest'

/**
 * Turns the Forest Estimations object into a table, and adds the area reported
 * to FRA and the recipe layer estimation as rows.
 *
 * @param {ForestEstimations} fetchedForestEstimations Forest Estimations object.
 * @param {string} recipeLayerName The property name of the recipe.
 * @public
 */
export const builForestEstimationsDataTable = (
  fetchedForestEstimations: ForestEstimations
): [string, number, number, string][] => {
  if (!fetchedForestEstimations) throw Error('Data unavailable.')

  const estimationsData: [string, number, number, string][] = []
  const fra1ALandArea = fetchedForestEstimations.data.fra1aLandArea
  const reportedFra1aForestArea = fetchedForestEstimations.data.fra1aForestArea

  Object.keys(forestLayersMetadata).forEach((key: ForestKey) => {
    const metadata = forestLayersMetadata[key]

    if (!('forestAreaDataProperty' in metadata)) return

    if (key !== ForestKey.Hansen) {
      const label = metadata.title ?? key
      const area = fetchedForestEstimations.data[
        metadata.forestAreaDataProperty as keyof ForestEstimationsData
      ] as number

      if (typeof area === 'undefined') return

      const percentage = (area * 100) / (fra1ALandArea * 1000)
      estimationsData.push([label, Number(area.toFixed(2)), Number(percentage.toFixed(2)), key])
    } else {
      hansenPercentages.forEach((number: number) => {
        const label = `${metadata.title ?? key} ${number} %`
        const area = fetchedForestEstimations.data[
          (metadata.forestAreaDataProperty + number) as keyof ForestEstimationsData
        ] as number

        if (typeof area === 'undefined') return

        const percentage = (area * 100) / (fra1ALandArea * 1000)
        estimationsData.push([label, Number(area.toFixed(2)), Number(percentage.toFixed(2)), key])
      })
    }
  })

  // Adding the reported Forest Area to the data.
  const reportedToFraLabel = ExtraEstimation.ReportedToFRA
  const reportedFra1aForestAreaHa = reportedFra1aForestArea * 1000 // Normalize to Ha. Instead of Thousands of Ha.
  const fra1aForestAreaPercentage = (reportedFra1aForestAreaHa * 100) / (fra1ALandArea * 1000)
  estimationsData.push([
    reportedToFraLabel,
    reportedFra1aForestAreaHa,
    Number(fra1aForestAreaPercentage.toFixed(2)),
    ExtraEstimation.ReportedToFRA,
  ])

  return estimationsData
}
