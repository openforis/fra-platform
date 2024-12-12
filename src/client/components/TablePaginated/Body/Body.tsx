import React from 'react'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { CountryUserSummary } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useTablePaginatedData } from 'client/store/ui/tablePaginated'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import DataColumn from 'client/components/DataGridDeprecated/DataColumn'
import RowsSkeleton from 'client/components/TablePaginated/Body/RowsSkeleton'
import { Props as BaseProps } from 'client/components/TablePaginated/types'

const Body = <Datum extends object>(props: BaseProps<Datum>) => {
  const { columns, compareFn, limit, path, wrapCells, skeleton } = props

  const data = useTablePaginatedData<Datum>(path, compareFn)
  const { countryIso } = useCountryRouteParams<CountryIso>()
  if (Objects.isNil(data)) {
    return <RowsSkeleton columns={columns} limit={limit} skeleton={skeleton} />
  }

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const d2 = Object.groupBy(data ?? [], (d) => CountryUserSummaries.getRoleName(d as CountryUserSummary, countryIso))

  // console.log({ d2: Object.entries(d2) })

  return (
    <>
      {data.map((datum, rowIndex) => (
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
      ))}
    </>
  )
}

export default Body
