import './RowsGroup.scss'
import React, { useCallback, useState } from 'react'
import classNames from 'classnames'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import Rows from 'client/components/TablePaginated/Body/Rows'
import { Props as BaseProps } from 'client/components/TablePaginated/types'

type Props<Datum extends object> = Pick<BaseProps<Datum>, 'columns' | 'groups' | 'wrapCells'> & {
  data: Array<Datum>
  propertyKey: PropertyKey
}

const RowsGroup = <Datum extends object>(props: Props<Datum>): React.ReactElement => {
  const { columns, data, groups, propertyKey, wrapCells } = props

  const [collapsed, setCollapsed] = useState<boolean>(groups.initialCollapsed?.(propertyKey) ?? false)
  const toggleView = useCallback(() => setCollapsed((prevState) => !prevState), [])

  return (
    <div>
      <Button
        className={classNames('rows-group__header', { collapsed })}
        iconName="small-down"
        inverse
        label={`${groups.headerLabel(propertyKey)} (${data.length})`}
        onClick={toggleView}
        size={ButtonSize.m}
        type={ButtonType.black}
      />
      {!collapsed && (
        <div className="rows-group__rows">
          <Rows columns={columns} data={data} wrapCells={wrapCells} />
        </div>
      )}
    </div>
  )
}

export default RowsGroup
