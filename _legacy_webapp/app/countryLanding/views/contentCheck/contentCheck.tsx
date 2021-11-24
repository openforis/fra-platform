import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { batchActions } from '../../../../store'
import { fetchTableData } from '../../../../components/Assessment/DataTable/actions'
import { useCountryIso } from '../../../../store/app'
import useSectionTables from '../../../../pages/AssessmentSection/useSectionTables'
import SectionView from '../../../../components/Assessment/SectionView'

import { FRA } from '@core/assessment'

const ContentCheck: React.FC = () => {
  const assessmentType = FRA.type
  const sectionName = 'contentCheck'
  const countryIso = useCountryIso()

  const dispatch = useDispatch()
  const tables = useSectionTables(assessmentType, sectionName)

  useEffect(() => {
    dispatch(
      batchActions([...tables.map((table) => fetchTableData(table.assessmentType, table.sectionName, table.tableName))])
    )
  }, [countryIso])

  return <SectionView assessmentType={assessmentType} sectionName={sectionName} />
}

export default ContentCheck
