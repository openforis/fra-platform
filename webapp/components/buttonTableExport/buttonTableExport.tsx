import './buttonTableExport.less'

import React from 'react'

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { CSVLink } from 'react-csv'

import { useIsAssessmentLocked, usePrintView } from '@webapp/components/hooks'

import Icon from '../icon'
import * as Utils from './utils'

type OwnProps = {
  disabled?: boolean
  filename?: string
  tableRef: any
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ButtonTableExport.defaultProps

// @ts-expect-error ts-migrate(7022) FIXME: 'ButtonTableExport' implicitly has type 'any' beca... Remove this comment to see the full error message
const ButtonTableExport = (props: Props) => {
  const { disabled, filename, tableRef } = props

  const [printView] = usePrintView()
  const isLocked = useIsAssessmentLocked()

  if (printView) return null

  return (
    <CSVLink
      className={`fra-table__btn-export btn-xs btn-primary${isLocked && !disabled ? '' : ' disabled'}`}
      target="_blank"
      filename={`${filename}.csv`}
      data={Utils.getData(tableRef.current)}
    >
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; name: string; }' is not... Remove this comment to see the full error message */}
      <Icon className="icon-sub icon-white" name="hit-down" />
      CSV
    </CSVLink>
  )
}

ButtonTableExport.defaultProps = {
  disabled: false,
  filename: 'tableData',
}

export default ButtonTableExport
