import { CountryIso } from 'meta/area'

import { getFileName } from 'test/bulkDownloadComparison/getFileName'
import { readCSV } from 'test/bulkDownloadComparison/readCSV'
import { RawFile, RawFileRow, Value, ValueDiff } from 'test/bulkDownloadComparison/types'
import { parseValue } from 'test/dataExportComparison/parseValue'

const skip: Array<string> = ['regions', 'name', '4a_fo_unknown', '3a_prim_no_unknown']

const reduceArray = (file: RawFile): Value =>
  file.reduce<Value>((previousValue: Value, currentValue: RawFileRow) => {
    const { iso3, year, ...rest } = currentValue

    // eslint-disable-next-line no-param-reassign
    if (!previousValue[iso3]) previousValue[iso3] = {}
    // eslint-disable-next-line no-param-reassign
    if (!previousValue[iso3][year]) previousValue[iso3][year] = {}

    // eslint-disable-next-line no-param-reassign
    previousValue[currentValue.iso3][currentValue.year] = rest

    return previousValue
  }, {} as Value)

export const compareFiles = async (outPath: string, fileName: string): Promise<Array<ValueDiff>> => {
  const localFilename = `${outPath}/local/${getFileName(fileName)}`
  const localFile = await readCSV(localFilename)
  const legacyFileName = `${outPath}/legacy/${getFileName(fileName)}`
  const legacyFile = await readCSV(legacyFileName)

  // Expect legacy data is the correct
  // Source of truth, compare against:
  const legacy = reduceArray(legacyFile)

  // Expect to be same as legacy
  const local = reduceArray(localFile)

  const countryIsos = Object.keys(legacy) as Array<CountryIso>
  const years = Object.keys(legacy[countryIsos[0]])
  const variables = Object.keys(legacy[countryIsos[0]][years[0]]).filter((variable) => {
    return !skip.includes(variable)
  })

  const diff: ValueDiff[] = []
  countryIsos.forEach((countryIso) => {
    years.forEach((year) => {
      variables.forEach((variableName) => {
        const valueLegacy = legacy[countryIso][year][variableName]
        const valueLocal = local[countryIso][year][variableName]
        const error = Math.abs(parseValue(valueLocal) - parseValue(valueLegacy)) >= 0.01
        if (error) {
          diff.push({
            fileName,
            countryIso,
            year,
            variableName,
            valueLegacy,
            valueLocal,
          })
        }
      })
    })
  })

  return diff
}
