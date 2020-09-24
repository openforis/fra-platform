import './assessmentSectionView.less'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { batchActions } from '@webapp/main/reduxBatch'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import { useCountryIso, useIsDataExportView } from '@webapp/components/hooks'
import DataExport from '@webapp/app/dataExport'

import { fetchTableData } from '@webapp/app/assessment/components/dataTable/actions'
import { fetchLastSectionUpdateTimestamp, resetSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'

import AssessmentSection from './assessmentSection'
import useSectionTables from './useSectionTables'

const AssessmentSectionView = () => {
  const { assessmentType, section: sectionName } = useParams()

  const countryIso = useCountryIso()
  const isDataExport = useIsDataExportView()
  const dispatch = useDispatch()
  const tables = useSectionTables(assessmentType, sectionName)

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const { documentElement } = document
    if (documentElement.scrollTo) {
      documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    } else {
      // Non Chromium based Edge version
      documentElement.scrollIntoView(true)
    }

    if (!isDataExport) {
      dispatch(
        batchActions([
          ...tables.map((table) =>
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

  return <AssessmentSection assessmentType={assessmentType} sectionName={sectionName} />
}

export default AssessmentSectionView
