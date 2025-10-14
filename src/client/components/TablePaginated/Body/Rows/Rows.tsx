import React, { ReactElement } from 'react'

import classNames from 'classnames'

import { DataCell } from 'client/components/DataGrid'
import { Props as BaseProps } from 'client/components/TablePaginated/types'

type Props<Datum extends object> = Pick<BaseProps<Datum>, 'columns' | 'wrapCells'> & {
  data: Array<Datum>
}

const Rows = <Datum extends object>(props: Props<Datum>): Array<ReactElement> => {
  const { columns, data, wrapCells } = props

  return data.map((datum, rowIndex) => (
    <React.Fragment key={`row_${String(rowIndex)}}`}>
      {columns.map((column) => {
        const { component: Component, key } = column

        if (wrapCells) {
          return (
            <DataCell key={key} className={classNames({ withBorder: rowIndex !== 0 })}>
              <Component datum={datum} rowIndex={rowIndex} />
            </DataCell>
          )
        }

        return <Component key={key} datum={datum} rowIndex={rowIndex} />
      })}
    </React.Fragment>
  ))
}

export default Rows
