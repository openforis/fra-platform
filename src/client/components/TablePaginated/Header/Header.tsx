import React from 'react'
import { useTranslation } from 'react-i18next'

import DataColumn from 'client/components/DataGrid/DataColumn'
import { PropsHeader } from 'client/components/TablePaginated/TablePaginated'

const Header = <Datum extends object>(props: PropsHeader<Datum>) => {
  const { columns } = props
  const { t } = useTranslation()

  return (
    <>
      {columns.map((column) => {
        const { header: Header, key } = column

        return (
          <DataColumn head key={`${key}_header`}>
            {typeof Header === 'string' && t(Header)}
            {typeof Header !== 'string' && <Header />}
          </DataColumn>
        )
      })}
    </>
  )
}

export default Header
