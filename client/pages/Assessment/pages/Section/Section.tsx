import './section.scss'
import React, { useEffect } from 'react'
import { useCountryIso } from '@client/hooks'
import { useAppDispatch } from '@client/store'
import { useAssessmentSection, AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useParams } from 'react-router'
import { AssessmentName } from '@meta/assessment'
import { AssessmentActions, useSectionMetaData } from '@client/store/assessment'

const Section: React.FC = () => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const sectionMetaData = useSectionMetaData()
  const sectionTableData = useAssessmentSection()
  const { assessmentName, cycleName, section } =
    useParams<{ assessmentName: AssessmentName; cycleName: string; section: string }>()

  // Update section tables' metadata on countryIso(url) change
  useEffect(() => {
    dispatch(
      AssessmentActions.getSectionTablesMetadata({
        assessmentName,
        cycleName,
        section,
        countryIso,
      })
    )
  }, [countryIso])

  // Update section tables' data on (countryIso ->) metadata change
  useEffect(() => {
    dispatch(
      AssessmentSectionActions.getSectionData({
        assessmentName,
        cycleName,
        section,
        countryIso,
        tableNames: sectionMetaData.map((table) => table.props.name),
      })
    )
  }, [JSON.stringify(sectionMetaData)])

  return (
    <div>
      <h2>section.tables</h2>
      <pre>{JSON.stringify(sectionMetaData, null, 2)}</pre>
      <h2>section.tableData</h2>
      <pre>{JSON.stringify(sectionTableData, null, 2)}</pre>
    </div>
  )
}

export default Section
