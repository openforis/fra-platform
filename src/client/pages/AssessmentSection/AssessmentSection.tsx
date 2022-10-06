import './AssessmentSection.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { AssessmentName, SubSections } from '@meta/assessment'

import { useAssessmentSection, useCycle } from '@client/store/assessment'
import { useTableSections } from '@client/store/pages/assessmentSection'
import { useIsSectionDataEmpty } from '@client/store/pages/assessmentSection/hooks'
import { useCanEditDescriptions, useCanEditTableData } from '@client/store/user/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'

import DataTable from './DataTable'
import Descriptions, { GeneralComments } from './Descriptions'
import SectionHeader from './SectionHeader'
import Title from './Title'

type Props = {
  section?: string
}

const AssessmentSection: React.FC<Props> = (props: Props) => {
  const { section: sectionProp } = props
  const { i18n } = useTranslation()
  const { assessmentName } = useParams<{ assessmentName: AssessmentName; cycleName: string; sectionName: string }>()
  const cycle = useCycle()
  const subSection = useAssessmentSection(sectionProp)
  const tableSections = useTableSections({ sectionName: subSection?.props.name })
  const canEditTableData = useCanEditTableData(sectionProp)
  const canEditDescriptions = useCanEditDescriptions(sectionProp)
  const { print, onlyTables } = useIsPrint()

  const { showTitle, descriptions, name: sectionName } = subSection?.props ?? {}
  // Hide the whole section if no tables have data
  const isSectionDataEmpty = useIsSectionDataEmpty(tableSections)
  if (onlyTables && isSectionDataEmpty) {
    return null
  }

  const anchor = SubSections.getAnchor({ cycle, subSection })

  return (
    <div className={`app-view__content assessment-section__${sectionName}`}>
      {showTitle && print && (
        <h2 className="title only-print">
          {`${onlyTables ? '' : `${anchor} `}${i18n.t<string>(`${sectionName}.${sectionName}`)}`}
        </h2>
      )}

      <SectionHeader assessmentName={assessmentName} sectionName={sectionName} disabled={!canEditTableData} />

      <Descriptions sectionName={sectionName} descriptions={descriptions} disabled={!canEditDescriptions} />
      {showTitle && <Title assessmentName={assessmentName} subSection={subSection} />}

      {tableSections.map((tableSection) => (
        <div key={tableSection.uuid}>
          {tableSection.props.labelKey && (
            <h3 className="subhead assessment-section__table-title">{i18n.t<string>(tableSection.props.labelKey)}</h3>
          )}
          {tableSection.props.descriptionKey && (
            <div className="app-view__section-toolbar no-print">
              <div className="support-text">{i18n.t<string>(tableSection.props.descriptionKey)}</div>
            </div>
          )}

          {tableSection.tables.map((table) => (
            <React.Fragment key={table.props.name}>
              <DataTable
                assessmentName={assessmentName}
                sectionName={sectionName}
                sectionAnchor={anchor}
                table={table}
                disabled={!canEditTableData}
              />
              {table.props.print?.pageBreakAfter && <div className="page-break" />}
            </React.Fragment>
          ))}
        </div>
      ))}

      {descriptions.comments && <GeneralComments sectionName={sectionName} disabled={!canEditDescriptions} />}

      <div className="page-break" />
    </div>
  )
}

AssessmentSection.defaultProps = {
  section: undefined,
}

export default AssessmentSection
