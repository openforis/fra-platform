import { useEffect } from 'react'

import { AssessmentNames } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useIsOdpTableDataFetched } from 'client/store/data'
import { DataActions } from 'client/store/data/slice'
import { useCanEdit } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

import { Props } from './props'
import { useDependencies } from './useDependencies'

export const useGetData = (props: Props) => {
  const { sectionName, table } = props
  const canEdit = useCanEdit(sectionName)

  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const dependencies = useDependencies(props)
  const odpFetched = useIsOdpTableDataFetched()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const { name: tableName, odp } = table.props

  useEffect(() => {
    dependencies.map.forEach((dependency) => {
      const getTableDataProps = {
        assessmentName: dependency.assessmentName,
        cycleName: dependency.cycleName,
        countryIso,
        tableName: dependency.tableName,
      }
      dispatch(DataActions.getTableData(getTableDataProps))
    })

    const isFra = assessmentName === AssessmentNames.fra
    // always fetch odp data if not in store or current table has odp
    if (isFra && (odp || !odpFetched)) {
      dispatch(DataActions.getODPTableData({ assessmentName, countryIso, cycleName }))
    }
    if (odp && canEdit) {
      dispatch(DataActions.getNodeValuesEstimations({ assessmentName, countryIso, cycleName, tableName, sectionName }))
      // TODO: disabled for now. fix it in https://github.com/openforis/fra-platform/issues/2880
      // dispatch(DataActions.getODPLastUpdatedTimestamp({ assessmentName, countryIso, cycleName, sectionName }))
    }
  }, [
    assessmentName,
    canEdit,
    countryIso,
    cycleName,
    dependencies.map,
    dispatch,
    odp,
    odpFetched,
    sectionName,
    tableName,
  ])
}
