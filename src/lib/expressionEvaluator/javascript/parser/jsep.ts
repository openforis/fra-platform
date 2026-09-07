import jsepObjectImport from '@jsep-plugin/object'
import jsepImport from 'jsep'

// @ts-ignore
const jsep = jsepImport.default || jsepImport
// @ts-ignore
const jsepObject = jsepObjectImport.default || jsepObjectImport

jsep.plugins.register(jsepObject)

// let formulas skip optional arguments, e.g. validatorSubCategory(a, [b], undefined, 'key')
jsep.addLiteral('undefined', undefined)

const OPEN_PARENTHESIS_CODE = 40 // (
const CLOSE_PARENTHESIS_CODE = 41 // )

const SEQUENCE_EXPRESSION = 'SequenceExpression'

// keep sequence expressions in parsed expression, even when there is only one node inside of it
// (by default the unnecessary enclosing parenthesis of a sequence expression are omitted, but this won't work in the basic expression editor)
const sequenceExpressionPlugin = {
  name: 'the plugin',
  init(thisJsep: any): void {
    thisJsep.hooks.add('gobble-token', (env: any): void => {
      const { context } = env
      // token starts with
      if (!thisJsep.isIdentifierStart(context.code) && context.code === OPEN_PARENTHESIS_CODE) {
        context.index += 1
        const nodes = context.gobbleExpressions(CLOSE_PARENTHESIS_CODE)
        if (context.code === CLOSE_PARENTHESIS_CODE) {
          context.index += 1
          if (nodes.length > 0) {
            // eslint-disable-next-line no-param-reassign
            env.node = {
              type: SEQUENCE_EXPRESSION,
              expression: nodes[0],
            }
          }
        } else {
          context.throwError('Unclosed (')
        }
      }
    })
  },
}

jsep.plugins.register(sequenceExpressionPlugin as any)

export { jsep }
