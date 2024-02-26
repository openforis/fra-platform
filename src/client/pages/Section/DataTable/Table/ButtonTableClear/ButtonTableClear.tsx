import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonType } from 'client/components/Buttons/Button'

type Props = {
  disabled?: boolean
  table: Table
  sectionName: string
}

const ButtonTableClear: React.FC<Props> = (props) => {
  const { disabled, table, sectionName } = props

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const { print } = useIsPrintRoute()
  const isLocked = useIsDataLocked()

  const tableName = table.props.name

  const _onClick = useCallback(() => {
    if (window.confirm(t('common.areYouSureYouWantToDeleteAllTableData'))) {
      dispatch(DataActions.clearTableData({ countryIso, assessmentName, cycleName, sectionName, tableName }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, sectionName, t, tableName])

  if (print) return null

  return (
    <Button
      disabled={!isLocked && disabled}
      iconName="trash-simple"
      inverse
      label={t('common.clearTable')}
      onClick={_onClick}
      type={ButtonType.danger}
    />
  )
}

ButtonTableClear.defaultProps = {
  disabled: false,
}

export default ButtonTableClear
