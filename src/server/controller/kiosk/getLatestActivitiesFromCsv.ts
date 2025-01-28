import { parseString } from 'fast-csv'

import { Activity } from 'meta/kiosk'

type Props = {
  csvData: string
}

export const getLatestActivitiesFromCsv = async (props: Props): Promise<Array<Activity>> => {
  const { csvData } = props

  return new Promise((resolve, reject) => {
    const activities: Array<Activity> = []
    let rowIndex = 0

    parseString(csvData, { headers: true, ignoreEmpty: true })
      .on('error', (error) => {
        reject(error)
      })
      .on('data', (row) => {
        const date = row['Date (YYYY-MM-DD)']
        const countryIso = row.ISO3

        const activity: Activity = {
          countryIso,
          countryName: row.Country,
          date,
          description: row.Description,
          id: rowIndex.toString(),
          lat: parseFloat(row['Location (lat)']),
          lng: parseFloat(row['Location (long)']),
        }

        activities.push(activity)
        rowIndex += 1
      })
      .on('end', () => {
        resolve(activities)
      })
  })
}
