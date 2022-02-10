import './section.scss'
import React, { useEffect } from 'react'
import { useCountryIso } from '@client/hooks'
import { useAppDispatch } from '@client/store'
import { useAssessmentSection, AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useParams } from 'react-router'
import { AssessmentName } from '@meta/assessment'

const Section: React.FC = () => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessmentSection = useAssessmentSection()
  const { metaData, data } = assessmentSection
  const { assessmentName, cycleName, section } =
    useParams<{ assessmentName: AssessmentName; cycleName: string; section: string }>()

  // Update section tables' metadata on countryIso or section (url) change
  useEffect(() => {
    dispatch(AssessmentSectionActions.reset())
    dispatch(
      AssessmentSectionActions.getSectionMetadata({
        assessmentName,
        cycleName,
        section,
        countryIso,
      })
    )
  }, [countryIso, section])

  // Update section tables' data on (countryIso ->) metadata change
  useEffect(() => {
    dispatch(
      AssessmentSectionActions.getSectionData({
        assessmentName,
        cycleName,
        section,
        countryIso,
        tableNames: metaData?.map((table) => table.props.name),
      })
    )
  }, [JSON.stringify(metaData)])

  return (
    <div>
      <h2>section.tables</h2>
      <pre>{JSON.stringify(metaData, null, 2)}</pre>
      <h2>section.tableData</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Section
