import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import { useAssessmentSection } from '@client/store/assessment'
import { useTableSections } from '@client/store/pages/assessmentSection'
import { useCanEditSection } from '@client/store/user'
import { AssessmentName } from '@meta/assessment'

import DataTable from './DataTable'
// import SectionHeader from './SectionHeader'
// import Descriptions from './Descriptions'
import Descriptions, { GeneralComments } from './Descriptions'
import SectionHeader from './SectionHeader'
import Title from './Title'
import './AssessmentSection.scss'

const AssessmentSection: React.FC = () => {
  const { i18n } = useTranslation()
  const { assessmentName } = useParams<{ assessmentName: AssessmentName; cycleName: string; section: string }>()
  const assessmentSection = useAssessmentSection()
  const tableSections = useTableSections({ sectionName: assessmentSection?.props?.name })
  const canEditSection = useCanEditSection()
  const [printView, printOnlyTablesView] = [false, false] // TODO: usePrintView()

  const panEuropean = assessmentName === AssessmentName.panEuropean
  const disabled = panEuropean || !canEditSection

  if (!assessmentSection) return null

  const { anchor, showTitle, descriptions, name: sectionName } = assessmentSection.props

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
