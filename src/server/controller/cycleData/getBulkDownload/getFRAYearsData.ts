import { Years } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { entries } from 'server/controller/cycleData/getBulkDownload/entries/FRAYears'
import { formatDatum } from 'server/controller/cycleData/getBulkDownload/formatDatum'
import { genders } from 'server/controller/cycleData/getBulkDownload/genders'
import { getClimaticValue } from 'server/controller/cycleData/getBulkDownload/getClimaticValue'
import { getData } from 'server/controller/cycleData/getBulkDownload/getData'

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

  const years = Years.fraYears(cycle)

  return countries.flatMap(({ countryIso, regionCodes, props: { deskStudy } }) =>
    years.flatMap<Record<string, string>>((year: string) => {
      const base: Record<string, string> = {
        regions: regionCodes.join(';'),
        iso3: countryIso,
        deskStudy: deskStudy ? 'assessment.deskStudy' : '',
        name: countryIso,
        year,
        boreal: getClimaticValue('boreal', countryIso, climaticData),
        temperate: getClimaticValue('temperate', countryIso, climaticData),
        tropical: getClimaticValue('tropical', countryIso, climaticData),
        subtropical: getClimaticValue('sub_tropical', countryIso, climaticData),
      }

      entries(cycle).forEach(({ variables, tableName }) => {
        variables.forEach(({ variableName, csvColumn }) => {
          let datum: string | null = null

          if (tableName === 'growingStockComposition2025') {
            const _year =
              RecordAssessmentDatas.getDatum({
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
                data: tableData,
                countryIso,
                tableName,
                variableName: 'mostRecentYear',
                colName: 'mostRecentYear',
              }) ?? years.at(-1)

            if (year === _year) {
              datum = RecordAssessmentDatas.getDatum({
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
                data: tableData,
                countryIso,
                tableName,
                variableName,
                colName: 'growingStockMillionCubicMeter',
              })
            }
          } else if (tableName === 'carbonStockSoilDepth') {
            datum = RecordAssessmentDatas.getDatum({
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              data: tableData,
              countryIso,
              tableName,
              variableName,
              colName: variableName,
            })
          } else if (tableName === 'graduationOfStudents' || tableName === 'employment') {
            genders.forEach((gender) => {
              const genderDatum = RecordAssessmentDatas.getDatum({
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
                data: tableData,
                countryIso,
                tableName,
                variableName,
                colName: `${year}_${gender.variable}`,
              })
              base[`${csvColumn}_${gender.csv}`] = formatDatum(genderDatum)
            })
          } else if (tableName === 'degradedForestMonitoring2025') {
            datum = RecordAssessmentDatas.getDatum({
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              data: tableData,
              countryIso,
              tableName,
              variableName,
              colName: 'doesYourCountryMonitor',
            })
          } else if (tableName === 'degradedForest') {
            datum = RecordAssessmentDatas.getDatum({
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              data: tableData,
              countryIso,
              tableName,
              variableName,
              colName: 'answer',
            })
          } else if (tableName === 'forestPolicy') {
            const _variableName = `${variableName.replace(/(sub_)?national_/, '')}`
            const _colName = variableName.includes('sub_national') ? 'sub_national_yes_no' : 'national_yes_no'

            datum = RecordAssessmentDatas.getDatum({
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              data: tableData,
              countryIso,
              tableName,
              variableName: _variableName,
              colName: _colName,
            })
          } else if (tableName === 'areaOfPermanentForestEstate' && variableName === 'applicable') {
            datum = RecordAssessmentDatas.getDatum({
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              data: tableData,
              countryIso,
              tableName,
              variableName: 'area_of_permanent_forest_estate',
              colName: 'applicable',
            })
          } else {
            datum = RecordAssessmentDatas.getDatum({
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              data: tableData,
              countryIso,
              tableName,
              variableName,
              colName: year,
            })
          }

          if (tableName !== 'graduationOfStudents' && tableName !== 'employment') {
            base[csvColumn] = formatDatum(datum)
          }
        })
      })

      return base
    })
  )
}
