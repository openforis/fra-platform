import { Assessment, Col, ColLinkedNode, ColStyle, ColType, CycleUuid, Label, Row } from '../../../src/meta/assessment'
import { ColSpec } from '../../../src/test/sectionSpec'
import { getCycleUuids, getLabels } from './utils'

const _getCalculateFn = (colSpec: ColSpec, cycles: string[], assessment: Assessment): Record<string, string> => {
  const calculateFn = colSpec.migration?.calculateFn

  if (!calculateFn) return undefined

  if (typeof calculateFn === 'string') {
    return cycles.reduce<Record<string, string>>((calcFnAgg, cycle) => ({ ...calcFnAgg, [cycle]: calculateFn }), {})
  }

  return Object.entries(calculateFn).reduce<Record<string, string>>(
    (acc, [cycleName, _calculateFn]) => ({
      ...acc,
      [assessment.cycles.find((c) => c.name === cycleName).uuid]: _calculateFn,
    }),
    {}
  )
}

// Return validateFns prop in format Record<cycleUuid, Array<string>>
const _getValidateFns = (colSpec: ColSpec, cycles: string[], assessment: Assessment): Record<string, Array<string>> => {
  const validateFns = colSpec.migration?.validateFns

  if (!validateFns) return undefined

  if (Array.isArray(validateFns)) {
    return cycles.reduce<Record<string, Array<string>>>(
      (valiteFnsAgg, cycle) => ({ ...valiteFnsAgg, [cycle]: validateFns }),
      {}
    )
  }

  return Object.entries(validateFns).reduce<Record<string, Array<string>>>(
    (acc, [cycleName, _validateFns]) => ({
      ...acc,
      [assessment.cycles.find((c) => c.name === cycleName).uuid]: _validateFns,
    }),
    {}
  )
}

export const getCol = (props: {
  assessment: Assessment
  colSpec: ColSpec
  row: Row
}): Col & { forceColName?: boolean } => {
  const { assessment, colSpec, row } = props
  const cycles = getCycleUuids({ assessment, migration: colSpec.migration, parentCycleUuids: row.props.cycles })
  const style = cycles.reduce<Record<string, ColStyle>>(
    (styleAgg, cycle) => ({
      ...styleAgg,
      [cycle]: colSpec.migration?.style
        ? colSpec.migration.style[assessment.cycles.find((c) => c.uuid === cycle).name]
        : { colSpan: colSpec.colSpan, rowSpan: colSpec.rowSpan },
    }),
    {}
  )
  let variableNo
  if (colSpec.migration?.variableNo) {
    variableNo = Object.entries(colSpec.migration.variableNo).reduce<Record<string, string>>(
      (acc, [cycleName, varNo]) => ({ ...acc, [assessment.cycles.find((c) => c.name === cycleName).uuid]: varNo }),
      {}
    )
  } else if (colSpec.variableNo) {
    variableNo = cycles.reduce<Record<string, string>>(
      (styleAgg, cycle) => ({ ...styleAgg, [cycle]: colSpec.variableNo }),
      {}
    )
  }

  let linkedNodes
  if (colSpec.migration?.linkedNodes) {
    linkedNodes = Object.entries(colSpec.migration.linkedNodes).reduce<Record<CycleUuid, ColLinkedNode>>(
      (acc, [cycleName, linkedNode]) => ({
        ...acc,
        [assessment.cycles.find((c) => c.name === cycleName).uuid]: linkedNode,
      }),
      {}
    )
  }

  const col: Col & { forceColName?: boolean } = {
    props: {
      cycles,
      colType: colSpec.type as unknown as ColType,
      index: colSpec.idx,
      colName: colSpec.colName,
      variableNo,
      calculateFn: _getCalculateFn(colSpec, cycles, assessment),
      validateFns: _getValidateFns(colSpec, cycles, assessment),
      style,
      classNames: {},
      inputPlaceholder: colSpec.inputPlaceholder,
      linkedNodes,
    },
    rowId: row.id,
  }

  // label migration
  const colSpecLabel = colSpec.label ? String(colSpec.label) : undefined
  if (colSpecLabel || colSpec.labelKey || colSpec.labelParams || colSpec.labelPrefixKey || colSpec.migration?.label) {
    const label: Label = {
      key: colSpec.labelKey,
      params: colSpec.labelParams,
      label: colSpecLabel,
      prefixKey: colSpec.labelPrefixKey,
    }
    col.props.labels = getLabels({ assessment, label, migration: colSpec.migration })
  }

  // select/multiselect migration
  if (colSpec.options) {
    col.props.select = {
      labelKeyPrefix: colSpec.optionsLabelKeyPrefix,
      options: colSpec.options.map((o) => ({
        name: o.optionName,
        hidden: o.hidden,
        type: o.type === 'header' ? 'header' : undefined,
      })),
    }
  }
  if (colSpec.migration?.forceColName) {
    col.forceColName = colSpec.migration.forceColName
  }
  return col
}
