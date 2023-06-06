import { ExtraEstimation, ForestEstimations, ForestEstimationsData, ForestSource, sourcesMetadata } from 'meta/geo'
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
  fetchedForestEstimations: ForestEstimations,
  recipeLayerName: string
): [string, number, number][] => {
  if (!fetchedForestEstimations) throw Error('Data unavailable.')

  const estimationsData: [string, number, number][] = []
  const fra1ALandArea = fetchedForestEstimations.data.fra1aLandArea
  const reportedFra1aForestArea = fetchedForestEstimations.data.fra1aForestArea

  Object.keys(sourcesMetadata).forEach((key: ForestSource) => {
    const metadata = sourcesMetadata[key]

    if (!('forestAreaDataProperty' in metadata)) return

    if (key !== ForestSource.Hansen) {
      const source = key
      const area = fetchedForestEstimations.data[metadata.forestAreaDataProperty as keyof ForestEstimationsData]

      if (typeof area === 'undefined') return

      const percentage = (area * 100) / (fra1ALandArea * 1000)
      estimationsData.push([source, Number(area.toFixed(2)), Number(percentage.toFixed(2))])
    } else {
      hansenPercentages.forEach((number: number) => {
        const source = `${key} ${number}`
        const area = fetchedForestEstimations.data[(metadata.forestAreaDataProperty + number) as keyof ForestEstimationsData]

        if (typeof area === 'undefined') return

        const percentage = (area * 100) / (fra1ALandArea * 1000)
        estimationsData.push([source, Number(area.toFixed(2)), Number(percentage.toFixed(2))])
      })
    }
  })

  // Adding the precalculated recipe data if available.
  if (recipeLayerName && recipeLayerName in fetchedForestEstimations.data) {
    const precalculatedRecipeLabel = ExtraEstimation.PrecalculatedRecipe
    const precalculatedRecipeAreaEstimation = fetchedForestEstimations.data[recipeLayerName as keyof ForestEstimationsData]
    const precalculatedRecipeAreaPercentage = (precalculatedRecipeAreaEstimation * 100) / (fra1ALandArea * 1000)
    estimationsData.push([
      precalculatedRecipeLabel,
      precalculatedRecipeAreaEstimation,
      Number(precalculatedRecipeAreaPercentage.toFixed(2)),
    ])
  }

  // Adding the reported Forest Area to the data.
  const reportedToFraLabel = ExtraEstimation.ReportedToFRA
  const reportedFra1aForestAreaHa = reportedFra1aForestArea * 1000 // Normalize to Ha. Instead of Thousands of Ha.
  const fra1aForestAreaPercentage = (reportedFra1aForestAreaHa * 100) / (fra1ALandArea * 1000)
  estimationsData.push([reportedToFraLabel, reportedFra1aForestAreaHa, Number(fra1aForestAreaPercentage.toFixed(2))])

  return estimationsData
}
