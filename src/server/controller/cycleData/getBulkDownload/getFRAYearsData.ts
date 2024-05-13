import { RecordAssessmentDatas } from 'meta/data'

import { entries } from 'server/controller/cycleData/getBulkDownload/entries/FRAYears'
import { genders } from 'server/controller/cycleData/getBulkDownload/genders'
import { getClimaticValue } from 'server/controller/cycleData/getBulkDownload/getClimaticValue'
import { getData } from 'server/controller/cycleData/getBulkDownload/getData'
import { getYears } from 'server/controller/cycleData/getBulkDownload/getYears'

import { climaticDomain } from './climaticDomain'
import { Props } from './props'

export const getFraYearsData = async (props: Props) => {
  const { assessment, cycle, countries } = props
  const _climaticData = await climaticDomain(props)
  const climaticData = RecordAssessmentDatas.getCycleData({
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    data: _climaticData,
  })
  const tableNames = entries(cycle).map(({ tableName }) => tableName)
  const tableData = await getData({
    assessment,
    cycle,
    countries,
    tableNames,
  })

  const data = RecordAssessmentDatas.getCycleData({
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    data: tableData,
  })

  // Unique years
  const years = getYears({
    data,
    countries,
    tableNames,
  }).filter((x) => Number.isInteger(+x))

  return countries.flatMap(({ countryIso, regionCodes }) =>
    years.flatMap<Record<string, string>>((year: string) => {
      const base: Record<string, string> = {
        regions: regionCodes.join(';'),
        iso3: countryIso,
        name: countryIso,
        year,
        boreal: getClimaticValue('boreal', countryIso, climaticData),
        temperate: getClimaticValue('temperate', countryIso, climaticData),
        tropical: getClimaticValue('tropical', countryIso, climaticData),
        subtropical: getClimaticValue('sub_tropical', countryIso, climaticData),
      }

      entries(cycle).forEach(({ variables, tableName }) => {
        variables.forEach(({ variableName, csvColumn }) => {
          if (tableName === 'carbonstocksoildepth')
            base[csvColumn] = RecordAssessmentDatas.getDatum({
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              data: tableData,
              countryIso,
              tableName,
              variableName,
              colName: variableName,
            })
          else if (tableName === 'graduationofstudents' || tableName === 'employment') {
            genders.forEach((gender) => {
              base[`${csvColumn}_${gender.csv}`] =
                RecordAssessmentDatas.getDatum({
                  assessmentName: assessment.props.name,
                  cycleName: cycle.name,
                  data: tableData,
                  countryIso,
                  tableName,
                  variableName,
                  colName: `${year}_${gender.variable}`,
                }) ?? null
            })
          } else {
            base[csvColumn] =
              RecordAssessmentDatas.getDatum({
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
                data: tableData,
                countryIso,
                tableName,
                variableName,
                colName: year,
              }) ?? null
          }
        })
      })

      return base
    })
  )
}
