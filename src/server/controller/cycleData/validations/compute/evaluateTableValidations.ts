import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { Assessment, RecordAssessments } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { NodeValueValidations } from 'meta/assessment/nodeValueValidations'
import { TableName } from 'meta/assessment/table'
import { RecordTables } from 'meta/assessment/table/record'
import { RecordTableValidationsState, TableValidations } from 'meta/assessment/validation/table'
import { RecordAssessmentData } from 'meta/data/recordData'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'
import { validatorEqualToPreviousCycleForestArea } from 'meta/expressionEvaluator/functions/validatorEqualToPreviousCycleForestArea'
import { Objects } from 'utils/objects'

type Props = {
  assessment: Assessment
  assessments: RecordAssessments
  country: Country
  cycle: Cycle
  data: RecordAssessmentData
  tableNames: Array<TableName>
  tables: RecordTables
}

export const evaluateTableValidations = (props: Props): RecordTableValidationsState => {
  const { assessment, assessments, country, cycle, data, tableNames, tables } = props
  const { countryIso } = country
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  if (tableNames.length === 0) {
    return {}
  }

  return tableNames.reduce<RecordTableValidationsState>((acc, tableName) => {
    const table = tables[tableName]
    const tableValidation: TableValidations = {}

    table?.rows?.forEach((row) => {
      const rowValidateFns = row.props.validateFns?.[cycle.uuid]

      row.cols.forEach((col) => {
        const validateFns = col.props.validateFns?.[cycle.uuid] ?? rowValidateFns
        if (!validateFns?.length || !col.props.colName || !row.props.variableName) {
          return
        }

        const validations = validateFns.map((formula) => {
          // hack to disable validatorEqualToPreviousCycleForestArea for Atlantis countries as explicitly requested.
          // This is the only way, unfortunately. We'll get back to this later on.
          if (Areas.isAtlantis(countryIso) && formula.includes(validatorEqualToPreviousCycleForestArea.name)) {
            return { valid: true }
          }

          return ExpressionEvaluator.evalFormula<NodeValueValidation>({
            assessmentName,
            assessments,
            colName: col.props.colName,
            country,
            countryIso,
            cycleName,
            data,
            formula,
            row,
          })
        })

        const validation = NodeValueValidations.merge(validations)
        if (!validation.valid) {
          Objects.setInPath({
            obj: tableValidation,
            path: [col.props.colName, row.props.variableName],
            value: validation,
          })
        }
      })
    })

    acc[tableName] = tableValidation
    return acc
  }, {})
}
