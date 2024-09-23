import { Promises } from 'utils/promises'

import { CommentableDescriptionName } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { getData } from 'server/controller/cycleData/getBulkDownload/getData'
import { getComments } from 'server/controller/cycleData/getBulkDownload/utils/getComments'

import { Props } from './props'

const variableToCsvColumn: Record<string, string> = {
  has_your_country_forest_restoration_commitments: 'restoration commitments',
  law_or_other_mandate: 'Law mandate',
  how_monitored: 'National definition',
  areas_in_need_of_restoration: 'areas in need of restoration',
  restoration_targets: 'restoration targets',
  hectares_restored: 'ha restored to date',
}

const colName = 'answer'
const tableName = 'forestRestoration'

export const getForestRestoration = async (props: Props) => {
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

    const variableNames = Object.keys(variableToCsvColumn)

    await Promises.each(variableNames, async (variableName) => {
      base[variableToCsvColumn[variableName]] = RecordAssessmentDatas.getDatum({
        assessmentName: assessment.props.name,
        colName,
        countryIso,
        cycleName: cycle.name,
        data: tableData,
        tableName,
        variableName,
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
