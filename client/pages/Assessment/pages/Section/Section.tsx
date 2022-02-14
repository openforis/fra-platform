import React, { useEffect } from 'react'
import { useCountryIso } from '@client/hooks'
import { useAppDispatch } from '@client/store'
import { useAssessmentSection, AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useParams } from 'react-router'
import { AssessmentName } from '@meta/assessment'
import TableSection from '@client/pages/Assessment/pages/Section/components/TableSection'

const Section: React.FC = () => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessmentSection = useAssessmentSection()
  const { metadata } = assessmentSection
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

  if (!metadata) return null

  // Update section tables' data on (countryIso ->) metadata change
  // useEffect(() => {
  //   dispatch(
  //     AssessmentSectionActions.getSectionData({
  //       assessmentName,
  //       cycleName,
  //       section,
  //       countryIso,
  //       tableNames: metadata?.map((table) => table.props.name),
  //     })
  //   )
  // }, [JSON.stringify(metadata)])

  return (
    <>
      <TableSection tableSection={metadata} />
    </>
  )
}

export default Section
