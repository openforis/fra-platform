import { Promises } from 'utils/promises'

import { CommentableDescriptionName } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { getData } from 'server/controller/cycleData/getBulkDownload/getData'
import { getComments } from 'server/controller/cycleData/getBulkDownload/utils/getComments'

import { Props } from './props'

const colNames = ['national_yes_no', 'sub_national_yes_no']
const tableName = 'forestPolicy'

const variableToCsvColumn: Record<string, string> = {
  sub_national_yes_no_policies_supporting_SFM: 'Sub-national policies supporting SFM',
  national_yes_no_legislations_supporting_SFM: 'National legislation supporting SFM',
  sub_national_yes_no_legislations_supporting_SFM: 'Sub-national legislation supporting SFM',
  national_yes_no_platform_for_stakeholder_participation: 'National platform',
  sub_national_yes_no_platform_for_stakeholder_participation: 'Sub-national platform',
  national_yes_no_existence_of_traceability_system: 'National traceability system',
  sub_national_yes_no_existence_of_traceability_system: 'Sub-national traceability system',
}

export const getForestPolicy = async (props: Props) => {
  const { assessment, cycle, countries } = props

  const tableNames = [tableName]

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

    const variableNames = Object.keys(variableToCsvColumn).reduce((acc, key) => {
      colNames.forEach((colName) => {
        acc.push(key.replace(`${colName}_`, ''))
      })
      return acc
    }, [])

    await Promises.each(variableNames, async (variableName) => {
      await Promises.each(colNames, async (colName) => {
        base[variableToCsvColumn[`${colName}_${variableName}`]] = RecordAssessmentDatas.getDatum({
          assessmentName: assessment.props.name,
          colName,
          countryIso,
          cycleName: cycle.name,
          data: tableData,
          tableName,
          variableName,
        })
      })
    })

    base.comments = await getComments({
      assessment,
      countryIso,
      cycle,
      name: CommentableDescriptionName.generalComments,
      sectionName: tableName,
    })

    arr.push(base)
  })

  return arr
}
