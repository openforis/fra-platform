import './DataGrid.scss'
import React, { CSSProperties, HTMLAttributes, PropsWithChildren, useMemo } from 'react'

import classNames from 'classnames'

type Props = PropsWithChildren<Pick<HTMLAttributes<HTMLDivElement>, 'className'>> &
  Pick<HTMLAttributes<HTMLDivElement>['style'], 'gridTemplateColumns'> & {
    withReview?: boolean
  }

const DataGrid: React.FC<Props> = (props) => {
  const { children, className, gridTemplateColumns, withReview } = props

  const style = useMemo<CSSProperties>(() => {
    if (withReview) return { gridTemplateColumns: `${gridTemplateColumns} auto` }
    return { gridTemplateColumns }
  }, [gridTemplateColumns, withReview])

  return (
    <div className={classNames('data-grid', className)} style={style}>
      {React.Children.toArray(children)}
    </div>
  )
}

DataGrid.defaultProps = {
  withReview: false,
}

export default DataGrid
