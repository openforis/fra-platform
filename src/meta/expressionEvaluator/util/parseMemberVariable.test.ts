import { BaseContext, Context } from 'meta/expressionEvaluator/context'
import { Member } from 'meta/expressionEvaluator/member'

import { MemberExpression } from 'lib/expressionEvaluator/node'

import { contextMock as context } from '../context.mock'
import { parseMemberVariable } from './parseMemberVariable'

const getBaseContext = (context: Context): BaseContext => {
  const { assessmentName, assessments, cycleName } = context

  return { assessmentName, cycleName, assessments }
}

describe('parseMemberVariable', () => {
  test('fra["2025"].extentOfForest.forestArea["2025"]', () => {
    const expected = {
      assessmentName: 'fra',
      // @ts-ignore
      colName: '2025',
      cycleName: '2025',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
    }

    const memberExpression: MemberExpression = {
      // @ts-ignore
      type: 'MemberExpression',
      computed: true,
      object: {
        // @ts-ignore
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'MemberExpression',
            computed: true,
            object: {
              type: 'Identifier',
              name: 'fra',
            },
            property: {
              type: 'Literal',
              value: '2025',
              raw: "'2025'",
            },
          },
          property: {
            type: 'Identifier',
            name: 'extentOfForest',
          },
        },
        property: {
          type: 'Identifier',
          name: 'forestArea',
        },
      },
      property: {
        // @ts-ignore
        type: 'Literal',
        value: '2025',
        raw: "'2025'",
      },
    }

    expect(parseMemberVariable(memberExpression, getBaseContext(context))).toEqual(expected)
  })
  test('fra["2025"].extentOfForest.forestArea', () => {
    const expected = {
      assessmentName: 'fra',
      // @ts-ignore
      colName: undefined,
      cycleName: '2025',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
    }

    const memberExpression: MemberExpression = {
      // @ts-ignore
      type: 'MemberExpression',
      computed: false,
      object: {
        // @ts-ignore
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'MemberExpression',
          computed: true,
          object: {
            type: 'Identifier',
            name: 'fra',
          },
          property: {
            type: 'Literal',
            value: '2025',
            raw: "'2025'",
          },
        },
        property: {
          type: 'Identifier',
          name: 'extentOfForest',
        },
      },
      property: {
        // @ts-ignore
        type: 'Identifier',
        name: 'forestArea',
      },
    }

    expect(parseMemberVariable(memberExpression, getBaseContext(context))).toEqual(expected)
  })
  test('extentOfForest.forestArea["2025"]', () => {
    const expected = {
      // @ts-ignore
      assessmentName: undefined,
      colName: '2025',
      // @ts-ignore
      cycleName: undefined,
      tableName: 'extentOfForest',
      variableName: 'forestArea',
    }

    const memberExpression: MemberExpression = {
      // @ts-ignore
      type: 'MemberExpression',
      computed: true,
      object: {
        // @ts-ignore
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'Identifier',
          name: 'extentOfForest',
        },
        property: {
          type: 'Identifier',
          name: 'forestArea',
        },
      },
      property: {
        // @ts-ignore
        type: 'Literal',
        value: '2025',
        raw: "'2025'",
      },
    }

    expect(parseMemberVariable(memberExpression, getBaseContext(context))).toEqual(expected)
  })
  test('growingStockComposition2025.remainingIntroduced.growingStockMillionCubicMeter', () => {
    const expected = {
      // @ts-ignore
      assessmentName: undefined,
      colName: 'growingStockMillionCubicMeter',
      // @ts-ignore
      cycleName: undefined,
      tableName: 'growingStockComposition2025',
      variableName: 'remainingIntroduced',
    }

    const memberExpression: MemberExpression = {
      // @ts-ignore
      type: 'MemberExpression',
      computed: false,
      object: {
        // @ts-ignore
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'Identifier',
          name: 'growingStockComposition2025',
        },
        property: {
          type: 'Identifier',
          name: 'remainingIntroduced',
        },
      },
      property: {
        // @ts-ignore
        type: 'Identifier',
        name: 'growingStockMillionCubicMeter',
      },
    }

    expect(parseMemberVariable(memberExpression, getBaseContext(context))).toEqual(expected)
  })

  test('extentOfForest.forestArea', () => {
    const expected = {
      // @ts-ignore
      assessmentName: undefined,
      // @ts-ignore
      colName: undefined,
      // @ts-ignore
      cycleName: undefined,
      tableName: 'extentOfForest',
      variableName: 'forestArea',
    }

    const memberExpression: MemberExpression = {
      // @ts-ignore
      type: 'MemberExpression',
      computed: false,
      object: {
        // @ts-ignore
        type: 'Identifier',
        name: 'extentOfForest',
      },
      property: {
        // @ts-ignore
        type: 'Identifier',
        name: 'forestArea',
      },
    }

    expect(parseMemberVariable(memberExpression, getBaseContext(context))).toEqual(expected)
  })

  test('fra[$prevCycle].extentOfForest.forestArea["2025"]', () => {
    const expected = {
      assessmentName: 'fra',
      colName: '2025',
      cycleName: '2020',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
    }

    const memberExpression: MemberExpression = {
      // @ts-ignore
      type: 'MemberExpression',
      computed: true,
      object: {
        // @ts-ignore
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'MemberExpression',
            computed: true,
            object: {
              type: 'Identifier',
              name: 'fra',
            },
            property: {
              type: 'Literal',
              value: Member.$prevCycle,
              raw: `'${Member.$prevCycle}'`,
            },
          },
          property: {
            type: 'Identifier',
            name: 'extentOfForest',
          },
        },
        property: {
          type: 'Identifier',
          name: 'forestArea',
        },
      },
      property: {
        // @ts-ignore
        type: 'Literal',
        value: '2025',
        raw: "'2025'",
      },
    }

    expect(parseMemberVariable(memberExpression, getBaseContext(context))).toEqual(expected)
  })
})
