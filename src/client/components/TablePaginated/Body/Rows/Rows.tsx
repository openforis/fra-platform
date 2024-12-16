import React from 'react'

import classNames from 'classnames'

import DataColumn from 'client/components/DataGridDeprecated/DataColumn'
import { Props as BaseProps } from 'client/components/TablePaginated/types'

type Props<Datum extends object> = Pick<BaseProps<Datum>, 'columns' | 'wrapCells'> & {
  data: Array<Datum>
}

const Rows = <Datum extends object>(props: Props<Datum>) => {
  const { columns, data, wrapCells } = props

  return data.map((datum, rowIndex) => (
    <React.Fragment key={`row_${String(rowIndex)}}`}>
      {columns.map((column) => {
        const { component: Component, key } = column

        if (wrapCells) {
          return (
            <DataColumn key={key} className={classNames({ withBorder: rowIndex !== 0 })}>
              <Component datum={datum} rowIndex={rowIndex} />
            </DataColumn>
          )
        }

        return <Component key={key} datum={datum} rowIndex={rowIndex} />
      })}
    </React.Fragment>
  ))
}

export default Rows
