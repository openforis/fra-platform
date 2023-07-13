import { CountryIso } from 'meta/area'
import { AssessmentName, Col, CycleName, NodeValueValidation, Row, Table } from 'meta/assessment'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useAppSelector } from 'client/store/store'
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
  const { table, row, col } = props

  const { assessmentName, cycleName, countryIso } = useCommonParams()

  return useAppSelector((state) => {
    const { nodeValueValidations } = state.data
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

  const { assessmentName, cycleName, countryIso } = useCommonParams()

  return useAppSelector((state) => {
    const { nodeValueValidations } = state.data
    const tableName = table.props.name

    const validations = nodeValueValidations[assessmentName]?.[cycleName]?.[countryIso]?.[tableName] ?? {}
    return Object.values(validations).some((validationCols) =>
      Object.values(validationCols).some((validation) => !validation.valid)
    )
  })
}
