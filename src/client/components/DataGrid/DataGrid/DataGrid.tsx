import './DataGrid.scss'
import React, { CSSProperties, forwardRef, HTMLAttributes, PropsWithChildren, useMemo } from 'react'

import classNames from 'classnames'

type Props = PropsWithChildren<Pick<HTMLAttributes<HTMLDivElement>, 'className'>> &
  Pick<HTMLAttributes<HTMLDivElement>['style'], 'gridTemplateColumns'> & {
    withActions?: boolean
  }

const DataGrid = forwardRef<HTMLDivElement, Props>((props, outerRef) => {
  const { children, className, gridTemplateColumns, withActions } = props

  const style = useMemo<CSSProperties>(() => {
    if (withActions) return { gridTemplateColumns: `${gridTemplateColumns} auto` }
    return { gridTemplateColumns }
  }, [gridTemplateColumns, withActions])

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
