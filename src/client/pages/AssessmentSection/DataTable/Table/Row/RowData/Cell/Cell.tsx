import './Cell.scss'
import React, { useCallback, useEffect } from 'react'

import { CountryIso } from '@meta/area'
import {
  Assessment,
  AssessmentMetaCache,
  AssessmentName,
  Col,
  ColType,
  Cycle,
  NodeValue,
  NodeValueValidation,
  NodeValueValidations,
  Row,
  Table,
} from '@meta/assessment'
import { VariablesByTableCache } from '@meta/assessment/assessmentMetaCache'
import { NodeUpdate, TableData, TableDatas } from '@meta/data'
import { ExpressionEvaluator } from '@meta/expressionEvaluator'
import { Authorizer } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useAssessmentSection, useCountry, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

import useClassName from './hooks/useClassName'
import useOnChange from './hooks/useOnChange'
import Calculated from './Calculated'
import Multiselect from './Multiselect'
import Number from './Number'
import Placeholder from './Placeholder'
import { PropsCell } from './props'
import Select from './Select'
import Taxon from './Taxon'
import Text from './Text'

const Components: Record<string, React.FC<PropsCell>> = {
  [ColType.calculated]: Calculated,
  [ColType.taxon]: Taxon,
  [ColType.text]: Text,
  [ColType.textarea]: Text,
  [ColType.decimal]: Number,
  [ColType.integer]: Number,
  [ColType.multiselect]: Multiselect,
  [ColType.select]: Select,
  [ColType.placeholder]: Placeholder,
}

type Props = {
  data: TableData
  assessmentName: AssessmentName
  sectionName: string
  table: Table
  disabled: boolean
  rowIndex: number
  col: Col
  row: Row
}

type UseValidateProps = {
  col: Col
  countryIso: CountryIso
  cycle: Cycle
  data: TableData
  nodeValue: NodeValue
  row: Row
  table: Table
}

const useValidate = (props: UseValidateProps): void => {
  const { col, countryIso, cycle, data, nodeValue, row, table } = props

  const dispatch = useAppDispatch()
  const assessmentOrig = useAssessment()

  const { colName } = col.props
  const validateFns = col.props.validateFns?.[cycle.uuid] ?? row.props.validateFns?.[cycle.uuid]

  useEffect(() => {
    if (validateFns) {
      const metaCache: AssessmentMetaCache = {
        calculations: {
          dependants: {},
          dependencies: {},
        },
        validations: {
          dependants: {},
          dependencies: {},
        },
        variablesByTable: Object.entries(table.validationDependencies ?? {}).reduce<VariablesByTableCache>(
          (acc, [_, variables]) => {
            variables.forEach((variable) => {
              // eslint-disable-next-line no-param-reassign
              acc[variable.tableName] = { ...acc[variable.tableName], [variable.variableName]: variable }
              // acc[variable.tableName] = {}// {...acc[variable.tableName],{[variable.variableName]:variable}}
            })
            return acc
          },
          {}
        ),
      }
      const assessment: Assessment = { ...assessmentOrig, metaCache: { [cycle.uuid]: metaCache } }
      const validations = validateFns.map((formula) => {
        return ExpressionEvaluator.evalFormula<NodeValueValidation>({
          assessment,
          countryIso,
          cycle,
          data,
          colName,
          row,
          formula,
        })
      })
      const validation = NodeValueValidations.merge(validations)

      const tableName = table.props.name
      const { variableName } = row.props
      dispatch(AssessmentSectionActions.setNodeValidation({ colName, countryIso, tableName, variableName, validation }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeValue.raw])
}

const Cell: React.FC<Props> = (props) => {
  const { data, assessmentName, sectionName, table, disabled, rowIndex, col, row } = props

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const country = useCountry(countryIso)
  const user = useUser()
  const section = useAssessmentSection(sectionName)
  const cycle = useCycle()

  const tableName = table.props.name
  const { variableName } = row.props
  const { colName } = col.props
  const params = { data, countryIso, tableName, variableName, colName }
  const nodeValue = TableDatas.getNodeValue(params)
  const valid = !Authorizer.canEditData({ country, cycle, section, user }) || NodeValueValidations.isValid(nodeValue)

  useValidate({ col, countryIso, cycle, data, nodeValue, row, table })

  const className = useClassName({ col, row, tableName, valid })
  const { onChange, onChangeNodeValue, onPaste } = useOnChange({ table, col, row, nodeValue, data, sectionName })

  const Component = Components[col.props.colType]

  const showError = useCallback(() => {
    if (!valid) {
      const nodeUpdate: NodeUpdate = { tableName, variableName, colName, value: nodeValue }
      dispatch(AssessmentSectionActions.setNodeValueValidation({ nodeUpdate }))
    }
  }, [colName, dispatch, nodeValue, tableName, valid, variableName])

  if (!Component) return null

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <td className={className} onClick={showError} onKeyDown={showError}>
      <Component
        assessmentName={assessmentName}
        sectionName={sectionName}
        table={table}
        disabled={disabled || nodeValue?.odp}
        rowIndex={rowIndex}
        col={col}
        row={row}
        nodeValue={nodeValue}
        onChange={onChange}
        onChangeNodeValue={onChangeNodeValue}
        onPaste={onPaste}
      />
    </td>
  )
}

export default Cell
