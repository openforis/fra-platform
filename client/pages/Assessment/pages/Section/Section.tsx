import './section.scss'
import React, { useEffect } from 'react'
import { useCountryIso } from '@client/hooks'
import { useAppDispatch } from '@client/store'
import { SectionActions, useSectionData } from '@client/store/data/section'
import { useParams } from 'react-router'
import { AssessmentName } from '@meta/assessment'

const Section: React.FC = () => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const sectionData = useSectionData()
  const { assessmentName, cycleName, section } =
    useParams<{ assessmentName: AssessmentName; cycleName: string; section: string }>()

  // Update section tables' metadata on countryIso(url) change
  useEffect(() => {
    dispatch(
      SectionActions.fetchSectionTablesMetadata({
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
      SectionActions.fetchSectionData({
        assessmentName,
        cycleName,
        section,
        countryIso,
        tableNames: sectionData.tables.map((table) => table.props.name),
      })
    )
  }, [sectionData.tables])

  return (
    <div>
      <h2>section.tables</h2>
      <pre>{JSON.stringify(sectionData?.tables, null, 2)}</pre>
      <h2>section.tableData</h2>
      <pre>{JSON.stringify(sectionData?.tableData, null, 2)}</pre>
    </div>
  )
}

export default Section
