import './assessmentSectionView.less'

import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { batchActions } from '@webapp/main/reduxBatch'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import useCountryIso from '@webapp/components/hooks/useCountryIso'

import { fetchTableData } from '@webapp/app/assessment/components/dataTable/actions'
import { fetchLastSectionUpdateTimestamp, resetSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'

import AssessmentSection from './assessmentSection'
import useSectionTables from './useSectionTables'

const AssessmentSectionView = () => {
  const { assessmentType, section: sectionName } = useParams()

  const countryIso = useCountryIso()
  const dispatch = useDispatch()
  const tables = useSectionTables(assessmentType, sectionName)
  const viewRef = useRef(null)

  useEffect(() => {
    // fetch data
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

    // scroll to top
    viewRef.current.scrollTop = 0

    return () => {
      dispatch(resetSectionUpdateTimestamp())
    }
  }, [sectionName, countryIso])

  return <AssessmentSection assessmentType={assessmentType} sectionName={sectionName} ref={viewRef} />
}

export default AssessmentSectionView
