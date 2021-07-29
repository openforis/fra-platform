import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { batchActions } from '@webapp/main/reduxBatch'
import { fetchTableData } from '@webapp/app/assessment/components/dataTable/actions'
import { useCountryIso } from '@webapp/components/hooks'

import useSectionTables from '@webapp/pages/AssessmentSection/useSectionTables'
import { SectionView } from '@webapp/components/Assessment'
import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'

import { FRA } from '@core/assessment'

const ContentCheck = () => {
  const assessmentType = FRA.type
  const sectionName = 'contentCheck'
  const countryIso = useCountryIso()

  const dispatch = useDispatch()
  const tables = useSectionTables(assessmentType, sectionName)

  useEffect(() => {
    dispatch(
      batchActions([
        ...tables.map((table: any) =>
          fetchTableData(
            table[SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType],
            table[SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName],
            table[SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]
          )
        ),
      ])
    )
  }, [countryIso])

  return <SectionView assessmentType={assessmentType} sectionName={sectionName} />
}

export default ContentCheck
