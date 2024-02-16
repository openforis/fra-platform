import './DataGrid.scss'
import React, { CSSProperties, forwardRef, HTMLAttributes, PropsWithChildren, useMemo } from 'react'

import classNames from 'classnames'

type Props = PropsWithChildren<Pick<HTMLAttributes<HTMLDivElement>, 'className'>> &
  Pick<HTMLAttributes<HTMLDivElement>['style'], 'gridColumn' | 'gridTemplateColumns'> & {
    withActions?: boolean
  }

const DataGrid = forwardRef<HTMLDivElement, Props>((props, outerRef) => {
  const { children, className, gridColumn, gridTemplateColumns = '1fr', withActions } = props

  const style = useMemo<CSSProperties>(() => {
    const _gridTemplateColumns = withActions ? `${gridTemplateColumns} auto` : gridTemplateColumns
    return { gridColumn, gridTemplateColumns: _gridTemplateColumns }
  }, [gridColumn, gridTemplateColumns, withActions])

  return (
    <div ref={outerRef} className={classNames('data-grid', className)} style={style}>
      {React.Children.toArray(children)}
    </div>
  )
})

DataGrid.defaultProps = {
  withActions: false,
}

export default DataGrid
