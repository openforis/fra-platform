import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { Col } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'

import { useAppSelector } from 'client/store/hooks'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryIso } from 'client/hooks'

const useCommonParams = (): { assessmentName: AssessmentName; cycleName: CycleName; countryIso: CountryIso } => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return { assessmentName, cycleName, countryIso }
}

export const useNodeValueValidation = (props: { table: Table; row: Row; col: Col }): NodeValueValidation => {
  const { col, row, table } = props

  const { assessmentName, countryIso, cycleName } = useCommonParams()

  return useAppSelector((state) => {
    const { nodeValueValidations } = state.dataDep
    const tableName = table.props.name
    const { colName } = col.props
    const { variableName } = row.props

    const validation =
      nodeValueValidations[assessmentName]?.[cycleName]?.[countryIso]?.[tableName]?.[colName]?.[variableName]
    return validation ?? { valid: true }
  })
}

export const useTableHasErrors = (props: { table: Table }): boolean => {
  const { table } = props

  const { assessmentName, countryIso, cycleName } = useCommonParams()

  return useAppSelector((state) => {
    const { nodeValueValidations } = state.dataDep
    const tableName = table.props.name

    const validations = nodeValueValidations[assessmentName]?.[cycleName]?.[countryIso]?.[tableName] ?? {}
    return Object.values(validations).some((validationCols) =>
      Object.values(validationCols).some((validation) => !validation.valid)
    )
  })
}
