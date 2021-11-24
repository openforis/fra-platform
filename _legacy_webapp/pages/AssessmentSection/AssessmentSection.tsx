import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { AssessmentType } from '@core/assessment'
import { batchActions } from '../../store'
import { documentScrollTo } from '../../utils/domUtils'
import { fetchTableData } from '../../components/Assessment/DataTable/actions'
import { fetchLastSectionUpdateTimestamp, resetSectionUpdateTimestamp } from '../../app/components/audit/actions'
import { useCountryIso, useIsDataExportView } from '../../hooks'

import DataExport from '../../components/Assessment/DataExport'
import SectionView from '../../components/Assessment/SectionView'
import useSectionTables from './useSectionTables'

const AssessmentSection: React.FC = () => {
  const { assessmentType, section: sectionName } = useParams<{ assessmentType: AssessmentType; section: string }>()

  const countryIso = useCountryIso()
  const isDataExport = useIsDataExportView()
  const dispatch = useDispatch()
  const tables = useSectionTables(assessmentType, sectionName)

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    documentScrollTo()

    if (!isDataExport) {
      dispatch(
        batchActions([
          ...tables.map((table) => fetchTableData(table.assessmentType, table.sectionName, table.tableName)),
          fetchLastSectionUpdateTimestamp(countryIso, sectionName),
        ])
      )

      return () => {
        dispatch(resetSectionUpdateTimestamp())
      }
    }
  }, [sectionName, countryIso])

  if (isDataExport) {
    return <DataExport />
  }

  return <SectionView assessmentType={assessmentType} sectionName={sectionName} />
}

export default AssessmentSection
