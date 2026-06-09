import './Body.scss'
import React from 'react'

import { Objects } from 'utils/objects'

import Rows from 'client/components/TablePaginated/Body/Rows'
import RowsGroup from 'client/components/TablePaginated/Body/RowsGroup'
import RowsSkeleton from 'client/components/TablePaginated/Body/RowsSkeleton'
import { Props as BaseProps } from 'client/components/TablePaginated/types'

import { useTablePaginatedBodyData } from './hooks/useTablePaginatedBodyData'

const Body = <Datum extends object>(props: BaseProps<Datum>): React.ReactElement => {
  const { columns, groups, limit, skeleton, wrapCells } = props

  const data = useTablePaginatedBodyData<Datum>(props)

  if (Objects.isNil(data)) {
    return <RowsSkeleton columns={columns} limit={limit !== undefined && limit > 0 ? limit : 5} skeleton={skeleton} />
  }

  if (!Objects.isNil(groups)) {
    return (
      <div className="table-paginated__groups">
        {(data as Array<[PropertyKey, Array<Datum>]>).map(([propertyKey, dataRows]) => (
          <RowsGroup
            key={propertyKey.toString()}
            columns={columns}
            data={dataRows}
            groups={groups}
            propertyKey={propertyKey}
            wrapCells={wrapCells}
          />
        ))}
      </div>
    )
  }

  return <Rows columns={columns} data={data as Array<Datum>} wrapCells={wrapCells} />
}

export default Body
