import { ColName } from 'meta/assessment/col'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { TableName } from 'meta/assessment/table'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'
import { VariableName } from 'meta/assessment/variable'
import { Objects } from 'utils/objects'

export type ValidationNodePath = {
  colName: ColName
  variableName: VariableName
}

export type ValidationUnsetRecord = Record<TableName, Array<ValidationNodePath>>

type PushProps = {
  colName: ColName
  tableName: TableName
  validation: NodeValueValidation
  variableName: VariableName
}

export class ContextResult {
  readonly #setValidations: RecordTableValidationsState
  readonly #unsetValidations: ValidationUnsetRecord

  constructor() {
    this.#setValidations = {}
    this.#unsetValidations = {}
  }

  get setValidations(): RecordTableValidationsState {
    return this.#setValidations
  }

  get unsetValidations(): ValidationUnsetRecord {
    return this.#unsetValidations
  }

  push(props: PushProps): void {
    const { colName, tableName, validation, variableName } = props

    if (validation.valid === false) {
      Objects.setInPath({
        obj: this.#setValidations,
        path: [tableName, colName, variableName],
        value: validation,
      })
      return
    }

    if (!this.#unsetValidations[tableName]) {
      this.#unsetValidations[tableName] = []
    }

    // The same cell may be queued more than once, but the Redis patch only needs one unset.
    const alreadyIncluded = this.#unsetValidations[tableName].find(
      (nodePath) => nodePath.colName === colName && nodePath.variableName === variableName
    )

    if (!alreadyIncluded) {
      this.#unsetValidations[tableName].push({ colName, variableName })
    }
  }
}
