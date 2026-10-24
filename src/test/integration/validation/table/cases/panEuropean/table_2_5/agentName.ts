import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_2_5'
const colName = 'agentOne'
const variableName = 'agentName'
const cell = { colName, tableName, variableName }

const datum = (name: VariableName, raw: string | null, col = colName): NodeUpdate => ({
  colName: col,
  tableName,
  value: { raw },
  variableName: name,
})

const invalid = { messages: [{ key: 'generalValidation.notEmpty', name: ValidatorName.notEmpty }], valid: false }

export const agentName: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.notEmpty}: empty data is valid`,
  },
  {
    cell,
    data: [datum(variableName, 'Fire')],
    expected: undefined,
    name: `${ValidatorName.notEmpty}: name without areas is valid`,
  },
  // An area reported for the agent in any year requires its name
  {
    cell,
    data: [datum('forest_1990', '100')],
    expected: invalid,
    name: `${ValidatorName.notEmpty}: area without name is invalid`,
  },
  // A reported 0 counts as an area
  {
    cell,
    data: [datum('forest_1990', '0')],
    expected: invalid,
    name: `${ValidatorName.notEmpty}: area of 0 without name is invalid`,
  },
  // A cleared area is stored as null and no longer counts as reported
  {
    cell,
    data: [datum('forest_1990', null)],
    expected: undefined,
    name: `${ValidatorName.notEmpty}: cleared area without name is valid`,
  },
  {
    cell,
    data: [datum(variableName, 'Fire'), datum('forest_1990', '100')],
    expected: undefined,
    name: `${ValidatorName.notEmpty}: area with name is valid`,
  },
  // Each agent needs its own name
  {
    cell,
    data: [datum(variableName, 'Fire', 'agentTwo'), datum('forest_1990', '100')],
    expected: invalid,
    name: `${ValidatorName.notEmpty}: area with the name of another agent is invalid`,
  },
  // The other agents are checked the same way against their own column
  {
    cell: { ...cell, colName: 'agentTwo' },
    data: [datum('forest_2000', '100', 'agentTwo')],
    expected: invalid,
    name: `${ValidatorName.notEmpty}: agent two area without name is invalid`,
  },
  {
    cell: { ...cell, colName: 'agentTwo' },
    data: [datum(variableName, 'Storm', 'agentTwo'), datum('forest_2000', '100', 'agentTwo')],
    expected: undefined,
    name: `${ValidatorName.notEmpty}: agent two area with name is valid`,
  },
  {
    cell: { ...cell, colName: 'agentThree' },
    data: [datum('forest_2005', '100', 'agentThree')],
    expected: invalid,
    name: `${ValidatorName.notEmpty}: agent three area without name is invalid`,
  },
  {
    cell: { ...cell, colName: 'agentThree' },
    data: [datum(variableName, 'Insects', 'agentThree'), datum('forest_2005', '100', 'agentThree')],
    expected: undefined,
    name: `${ValidatorName.notEmpty}: agent three area with name is valid`,
  },
  {
    cell: { ...cell, colName: 'agentFour' },
    data: [datum('forest_2010', '100', 'agentFour')],
    expected: invalid,
    name: `${ValidatorName.notEmpty}: agent four area without name is invalid`,
  },
  {
    cell: { ...cell, colName: 'agentFour' },
    data: [datum(variableName, 'Grazing', 'agentFour'), datum('forest_2010', '100', 'agentFour')],
    expected: undefined,
    name: `${ValidatorName.notEmpty}: agent four area with name is valid`,
  },
  {
    cell: { ...cell, colName: 'agentFive' },
    data: [datum('forest_2020', '100', 'agentFive')],
    expected: invalid,
    name: `${ValidatorName.notEmpty}: agent five area without name is invalid`,
  },
  {
    cell: { ...cell, colName: 'agentFive' },
    data: [datum(variableName, 'Drought', 'agentFive'), datum('forest_2020', '100', 'agentFive')],
    expected: undefined,
    name: `${ValidatorName.notEmpty}: agent five area with name is valid`,
  },
]
