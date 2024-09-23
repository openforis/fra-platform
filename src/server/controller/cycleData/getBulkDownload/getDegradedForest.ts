import { Promises } from 'utils/promises'

import { CommentableDescriptionName } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { getData } from 'server/controller/cycleData/getBulkDownload/getData'
import { getComments } from 'server/controller/cycleData/getBulkDownload/utils/getComments'

import { Props } from './props'

const variableToCsvColumn: Record<string, Record<string, string>> = {
  degradedforest2025: {
    hasNationalDefinitionOfDegradedForest: 'Has your country nat. definiton of degradation',
    national_definition: 'What is the national definition',
    criteriaOfDegradedForest: 'Criteria applied',
  },
  degradedforestmonitoring2025: {
    doesYourCountryMonitor: 'Does your country monitor degradation',
    mainMethods: 'Main methods applied',
    monitoringScale: 'Monitoring scale',
    yearOfLatestAssessment: 'year of latest assessment',
    degradedAreaForThatYear: 'Degraded forest area',
  },
}

export const getDegradedForest = async (props: Props) => {
  const { assessment, cycle, countries } = props

  const tableNames = Object.keys(variableToCsvColumn)

  const tableData = await getData({
    assessment,
    cycle,
    countries,
    tableNames,
  })

  const arr: Array<Record<string, string>> = []

  await Promises.each(countries, async ({ countryIso, regionCodes }) => {
    const base: Record<string, string> = {
      regions: regionCodes.join(';'),
      iso3: countryIso,
      name: countryIso,
    }

    tableNames.forEach((tableName) => {
      const variableMap = variableToCsvColumn[tableName]
      const variables = Object.keys(variableMap)
      variables.forEach((variableName) => {
        const csvColumn = variableMap[variableName]
        const value = RecordAssessmentDatas.getDatum({
          assessmentName: assessment.props.name,
          colName: variableName,
          countryIso,
          cycleName: cycle.name,
          data: tableData,
          tableName,
          variableName,
        })
        // mainMethods and criteriaOfDegradedForest are arrays
        if (['mainMethods', 'criteriaOfDegradedForest'].includes(variableName)) {
          base[csvColumn] = (value as unknown as Array<string>)?.join(', ') ?? null
        } else {
          base[csvColumn] = value ?? null
        }
      })
    })

    base.comments = await getComments({
      assessment,
      countryIso,
      cycle,
      name: CommentableDescriptionName.generalComments,
      sectionName: 'degradedForest',
    })
    arr.push(base)
  })

  return arr
}
