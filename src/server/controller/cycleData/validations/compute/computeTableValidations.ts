import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordTables } from 'meta/assessment/table/record'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'
import { Objects } from 'utils/objects'

import { DataContextBuilder } from 'server/controller/cycleData/validations/context/dataContextBuilder'

import { evaluateTableValidations } from './evaluateTableValidations'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  tables: RecordTables
}

export const computeTableValidations = async (props: Props): Promise<RecordTableValidationsState> => {
  const { assessment, country, cycle, tables } = props
  const tableNames = Object.keys(tables)

  if (Objects.isEmpty(tableNames)) return {}

  const dataContextBuilder = new DataContextBuilder({
    assessment,
    country,
    cycle,
    nodeUpdates: {
      assessmentName: assessment.props.name,
      countryIso: country.countryIso,
      cycleName: cycle.name,
      nodes: [],
    },
  })

  await dataContextBuilder.registerRequestedTables(tableNames)

  const { assessments, data } = await dataContextBuilder.getData()

  return evaluateTableValidations({
    assessment,
    assessments,
    country,
    cycle,
    data,
    tableNames,
    tables,
  })
}
