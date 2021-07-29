import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { AssessmentType } from '@core/assessment'
import { batchActions } from '@webapp/main/reduxBatch'
import { documentScrollTo } from '@webapp/utils/domUtils'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import { fetchTableData } from '@webapp/app/assessment/components/dataTable/actions'
import { fetchLastSectionUpdateTimestamp, resetSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'
import { useCountryIso, useIsDataExportView } from '@webapp/components/hooks'

import DataExport from '@webapp/app/dataExport'
import { SectionView } from '@webapp/components/Assessment'
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
          ...tables.map((table: any) =>
            fetchTableData(
              table[SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType],
              table[SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName],
              table[SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]
            )
          ),
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
