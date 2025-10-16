import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment/table'

import { NodeValuesActions } from 'client/store/data/tableData/nodeValues/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useIsDataLocked } from 'client/store/ui/countryReport/hooks/datalock'
import { useIsPrintRoute } from 'client/hooks/routes'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonType } from 'client/components/Buttons/Button'

type Props = {
  disabled?: boolean
  table: Table
  sectionName: string
}

const ButtonTableClear: React.FC<Props> = (props) => {
  const { disabled, sectionName, table } = props

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const { print } = useIsPrintRoute()
  const isLocked = useIsDataLocked()

  const tableName = table.props.name

  const _onClick = useCallback(() => {
    if (window.confirm(t('common.areYouSureYouWantToDeleteAllTableData'))) {
      dispatch(NodeValuesActions.clearTableData({ countryIso, assessmentName, cycleName, sectionName, tableName }))
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

export default ButtonTableClear
