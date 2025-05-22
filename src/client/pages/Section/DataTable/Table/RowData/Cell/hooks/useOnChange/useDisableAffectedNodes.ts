import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { NodeValue } from 'meta/assessment/node'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { DataActions } from 'client/store/data'
import { useSection } from 'client/store/metadata'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import useGetAffectedNodes from 'client/pages/Section/DataTable/Table/RowData/Cell/hooks/useOnChange/useAffectedNodes'

import { Props } from './types'

const useDisableAffectedNodes = (props: Props) => {
  const { col, row, sectionName, table } = props

  const { colName } = col.props
  const tableName = table.props.name
  const { variableName } = row.props

  const assessmentSection = useSection(sectionName)
  const dispatch = useAppDispatch()

  const { countryIso } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()
  const assessment = useAssessment()
  const { t } = useTranslation()

  const getAffectedNodes = useGetAffectedNodes(props)

  return useCallback(
    (value: NodeValue) => {
      const affected = getAffectedNodes(value)
      const fields = affected.map((a) => t(`measures.${a.variableName}`)).join('\n')
      const confirmed = window.confirm(
        t('common.areYouSureFollowingFieldsWillBeDisabled', { fields, interpolation: { escapeValue: false } })
      )
      if (!confirmed) return

      const updates = [
        {
          colName,
          value,
          variableName,
        },
        ...affected.map((a) => ({
          colName: a.colName,
          value: { raw: null } as NodeValue,
          variableName: a.variableName,
        })),
      ]

      dispatch(
        DataActions.updateNodeValues({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          sectionName: assessmentSection?.props.name,
          countryIso,
          tableName,
          values: updates,
        })
      )
    },
    [
      assessment.props.name,
      assessmentSection?.props.name,
      colName,
      countryIso,
      cycle.name,
      dispatch,
      getAffectedNodes,
      t,
      tableName,
      variableName,
    ]
  )
}

export default useDisableAffectedNodes
