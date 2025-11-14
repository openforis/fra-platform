import { parseString } from 'fast-csv'

import { KioskActivity } from 'meta/kiosk/activity'

type Props = {
  csvData: string
}

export const getLatestActivitiesFromCsv = async (props: Props): Promise<Array<KioskActivity>> => {
  const { csvData } = props

  return new Promise((resolve, reject) => {
    const activities: Array<KioskActivity> = []
    let rowIndex = 0

    parseString(csvData, { headers: true, ignoreEmpty: true })
      .on('error', (error) => {
        reject(error)
      })
      .on('data', (row) => {
        const activity: KioskActivity = {
          countryIso: row.ISO3,
          countryName: row.Country,
          description: row.Description,
          endDate: row['End date (YYYY-MM-DD)'],
          id: rowIndex.toString(),
          lat: parseFloat(row['Location (latitude)']),
          link: row.Link,
          lng: parseFloat(row['Location (longitude)']),
          startDate: row['Start date (YYYY-MM-DD)'],
          title: row.Title,
        }

        activities.push(activity)
        rowIndex += 1
      })
      .on('end', () => {
        resolve(activities)
      })
  })
}
