import './AssessmentSection.scss'

import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

import { AssessmentName } from '@meta/assessment'
import { useCountryIso } from '@client/hooks'
import { useAppDispatch } from '@client/store'
import { AssessmentSectionActions, useTableSections } from '@client/store/pages/assessmentSection'
import { useAssessmentSection } from '@client/store/assessment'

// import SectionHeader from './SectionHeader'
// import Descriptions from './Descriptions'
import { useCanEditSection } from '@client/store/user'
import Descriptions, { GeneralComments } from './Descriptions'
import Title from './Title'
import SectionHeader from './SectionHeader'
import DataTable from './DataTable'

const AssessmentSection: React.FC = () => {
  const assessmentSection = useAssessmentSection()
  const tableSections = useTableSections()

  const { assessmentName, cycleName, section } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
    section: string
  }>()

  const { i18n } = useTranslation()

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()

  const canEditSection = useCanEditSection()

  // Update section tables' metadata on countryIso or section (url) change
  useEffect(() => {
    dispatch(AssessmentSectionActions.reset())
    dispatch(
      AssessmentSectionActions.getTableSections({
        assessmentName,
        cycleName,
        section,
        countryIso,
      })
    )
  }, [countryIso, section])

  if (!assessmentSection) return null

  const { anchor, showTitle, descriptions, name: sectionName } = assessmentSection.props

  const panEuropean = assessmentName === AssessmentName.panEuropean
  const disabled = panEuropean || !canEditSection
  const [printView, printOnlyTablesView] = [false, false] // TODO: usePrintView()

  return (
    <div className={`app-view__content assessment-section__${sectionName}`}>
      {showTitle && printView && (
        <h2 className="title only-print">
          {`${printOnlyTablesView ? '' : `${anchor} `}${i18n.t(`${sectionName}.${sectionName}`)}`}
        </h2>
      )}

      <SectionHeader assessmentName={assessmentName} sectionName={sectionName} disabled={disabled} />

      {!panEuropean && <Descriptions sectionName={sectionName} descriptions={descriptions} disabled={disabled} />}

      {showTitle && <Title assessmentName={assessmentName} sectionName={sectionName} sectionAnchor={anchor} />}

      {tableSections.map((tableSection) => (
        <div key={String(tableSection.id)}>
          {/* // TODO Missing metadata */}
          {/* {tableSection.titleKey && ( */}
          {/*  <h3 className="subhead assessment-section__table-title">{i18n.t(tableSection.titleKey)}</h3> */}
          {/* )} */}
          {/* {tableSection.descriptionKey && ( */}
          {/*  <div className="app-view__section-toolbar no-print"> */}
          {/*    <div className="support-text">{i18n.t(tableSection.descriptionKey)}</div> */}
          {/*  </div> */}
          {/* )} */}

          {tableSection.tables.map((table) => (
            <React.Fragment key={table.props.name}>
              <DataTable
                assessmentName={assessmentName}
                sectionName={sectionName}
                sectionAnchor={anchor}
                table={table}
                disabled={disabled}
              />
              {/* {table.props.print.pageBreakAfter && <div className="page-break" />} */}
            </React.Fragment>
          ))}
        </div>
      ))}

      {descriptions.comments && <GeneralComments section={sectionName} disabled={disabled} />}

      <div className="page-break" />
    </div>
  )
}

export default AssessmentSection
