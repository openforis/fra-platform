import { useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { Col } from 'meta/assessment/col'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'

import { ValidationsSelectors } from 'client/store/data/tableData/validations/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useNodeValueValidation = (props: { table: Table; row: Row; col: Col }): NodeValueValidation => {
  const { col, row, table } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => {
    const tableName = table.props.name
    const { colName } = col.props
    const { variableName } = row.props

    const validation = ValidationsSelectors.getNodeValidation(
      state,
      assessmentName,
      cycleName,
      countryIso,
      tableName,
      colName,
      variableName
    )

    return validation ?? { valid: true }
  })
}

export const useTableHasErrors = (props: { table: Table }): boolean => {
  const { table } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  const tableValidations = useAppSelector((state) =>
    ValidationsSelectors.getTableValidations(state, assessmentName, cycleName, countryIso, table.props.name)
  )

  return useMemo<boolean>(() => {
    return Object.values(tableValidations).some((validationCols) =>
      Object.values(validationCols).some((validation) => !validation.valid)
    )
  }, [tableValidations])
}
