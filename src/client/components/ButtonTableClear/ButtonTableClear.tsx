import './ButtonTableClear.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Table } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { useCycle } from 'client/store/assessment'
import { DataActions } from 'client/store/data'
import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useCountryIso } from 'client/hooks'
import { useIsPrint } from 'client/hooks/useIsPath'
import Icon from 'client/components/Icon'

type Props = {
  disabled?: boolean
  table: Table
  assessmentName: string
  sectionName: string
}

const ButtonTableClear: React.FC<Props> = (props) => {
  const { disabled, table, assessmentName, sectionName } = props

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const countryIso = useCountryIso()
  const cycle = useCycle()
  const { print } = useIsPrint()
  const isLocked = useIsDataLocked()

  const _onClick = useCallback(() => {
    if (window.confirm(t('common.areYouSureYouWantToDeleteAllTableData'))) {
      dispatch(
        DataActions.clearTableData({
          countryIso,
          assessmentName,
          cycleName: cycle.name,
          sectionName,
          tableName: table.props.name,
        })
      )
    }
  }, [assessmentName, countryIso, cycle.name, dispatch, sectionName, t, table.props.name])

  if (print) return null

  return (
    <button
      type="button"
      className={classNames('btn-xs', 'btn-primary', 'no-print', 'fra-table__btn-clear', {
        disabled: !isLocked && disabled,
      })}
      onClick={_onClick}
    >
      <Icon className="icon-sub icon-white" name="trash-simple" />
      {t('common.clearTable')}
    </button>
  )
}

ButtonTableClear.defaultProps = {
  disabled: false,
}

export default ButtonTableClear
