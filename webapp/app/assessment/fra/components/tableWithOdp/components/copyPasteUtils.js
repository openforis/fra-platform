import React from 'react'
import ReactDOMServer from 'react-dom/server'
import * as R from 'ramda'
import * as clipboard from 'clipboard-polyfill'

import { toFixed } from '@common/bignumberUtils'
import { readPasteClipboard } from '@webapp/utils/copyPasteUtil'
import { acceptNextDecimal } from '@webapp/utils/numberInput'
import defaultYears from '@server/eof/defaultYears'

const mapIndexed = R.addIndex(R.map)

const getFraValues = (fra, rows) => {
  const valueFieldNames = R.reject(R.isNil, R.pluck('field', rows))
  const fraValues = R.pipe(
    R.filter(value => R.includes(value.year, defaultYears)),
    R.map(column => R.props(valueFieldNames, column))
  )(fra)
  return fraValues
}

const clipboardTable = (tableValues) => {
  return <table>
    <tbody>
    {
      tableValues.map((row, i) =>
        <tr key={i}>
          {mapIndexed((value, i) =>
              <td key={i}> {toFixed(value)} </td>
            , row)}
        </tr>
      )
    }
    </tbody>
  </table>
}

export const copyTableAsHtml = (i18n, data, rows) => {
  const transposedFraValues = R.transpose(getFraValues(data, rows))
  const htmlTable = ReactDOMServer.renderToString(clipboardTable(transposedFraValues))
  const dataTransfer = new clipboard.DT()
  dataTransfer.setData('text/plain', i18n.t('forestCharacteristics.forestCharacteristics'))
  dataTransfer.setData('text/html', htmlTable)
  clipboard.write(dataTransfer)
}

//====== Paste
export const updatePastedValues = (rowNames, evt, rowIdx, colIdx, fra) => {
  // Pasted values are not to be consumed if column is odp -- i.e. odp columns are to be skipped.
  // This is achieved by constructing correct 'view' on the fra data in two steps.
  // First odp values values that appear after where paste begins are filtered out.
  const fraOnly = R.filter(R.pipe(R.prop('type'), R.equals('fra')))(R.drop(colIdx, fra))
  // Second both fra and odp columns before where paste begins are concatenated together
  // with the filtered part to preserve correct index.
  const readFrom = R.concat(R.take(colIdx, fra), fraOnly)

  let toPaste = {}
  mapIndexed((r, i) => {
    const row = rowIdx + i
    mapIndexed((c, j) => {
      const col = colIdx + j
      if (R.isNil(readFrom[col])) return
      toPaste = R.mergeDeepRight({ [readFrom[col].year]: { [rowNames[row]]: c } }, toPaste)
    }, r)
  }, readPasteClipboard(evt, 'decimal'))

  const pasted = R.pipe(
    R.map(fra => {
      // Validates pasted values and filters out values that are not accepted
      const acceptedValues = R.pipe(
        R.keys,
        R.map(k => {
          return { [k]: acceptNextDecimal(String(toPaste[fra.year][k]), fra[k]) }
        }),
        R.reduce(R.mergeLeft, {})
      )(R.defaultTo({}, toPaste[fra.year]))

      return toPaste[fra.year] ? R.mergeRight(fra, acceptedValues) : null
    }),
    R.reject(R.isNil))(fra)

  return pasted
}
