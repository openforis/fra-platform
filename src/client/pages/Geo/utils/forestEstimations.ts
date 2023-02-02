import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { ForestEstimations, ForestEstimationsData, ForestSource, sourcesMetadata } from '@meta/geo'
import { hansenPercentages } from '@meta/geo/forest'

/**
 * Type for tabular data, consisting of an array of arrays with
 * source, area, and coverage percentage.
 */
export type TabularForestEstimationData = {
  data: [string, number, number][]
  fra1ALandArea: number // fra1ALandArea reported in thousands of Ha.
  fra1aForestArea: number // fra1aForestArea reported in thousands of Ha.
}

/**
 * Makes an API call to get the Forest Estimations in a country in a year,
 * in a tabular way.
 *
 * @param {string} countryIso The country to query the statistics data.
 * @param {string} year The year to query the statistics data.
 * @public
 */
export const getForestEstimationData = async (
  countryIso: string,
  year: number
): Promise<TabularForestEstimationData> => {
  const estimationsData: [string, number, number][] = []
  const response = await axios.get(ApiEndPoint.Geo.Estimations.forest(), { params: { countryIso, year } })
  const fetchedForestEstimations: ForestEstimations = response.data

  if (!fetchedForestEstimations) throw Error('Data unavailable.')

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
        const area =
          fetchedForestEstimations.data[(metadata.forestAreaDataProperty + number) as keyof ForestEstimationsData]

        if (typeof area === 'undefined') return

        const percentage = (area * 100) / (fra1ALandArea * 1000)
        estimationsData.push([source, Number(area.toFixed(2)), Number(percentage.toFixed(2))])
      })
    }
  })

  // Adding the reported Forest Area to the data.
  const reportedFra1aForestAreaHa = reportedFra1aForestArea * 1000 // Normalize to Ha. Instead of Thousands of Ha.
  const fra1aForestAreaPercentage = (reportedFra1aForestAreaHa * 100) / (fra1ALandArea * 1000)
  const reportedToFraLabel = 'Reported to FRA'
  estimationsData.push([reportedToFraLabel, reportedFra1aForestAreaHa, Number(fra1aForestAreaPercentage.toFixed(2))])

  return { data: estimationsData, fra1ALandArea, fra1aForestArea: reportedFra1aForestArea }
}
