import './AssessmentSection.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { AssessmentName, Labels, SubSections } from '@meta/assessment'

import { useAssessmentSection, useCycle } from '@client/store/assessment'
import { useTableSections } from '@client/store/pages/assessmentSection'
import { useIsSectionDataEmpty } from '@client/store/pages/assessmentSection/hooks'
import { useCanEditDescriptions, useCanEditTableData } from '@client/store/user/hooks'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'
import CommentableDescription from '@client/pages/AssessmentSection/Descriptions/CommentableDescription'

import DataTable from './DataTable'
import Descriptions, { GeneralComments } from './Descriptions'
import SectionHeader from './SectionHeader'
import Title from './Title'
import { useListenNodeUpdates } from './useListenNodeUpdates'
import { useListenValidationsUpdate } from './useListenValidationsUpdate'

type Props = {
  section?: string
}

const AssessmentSection: React.FC<Props> = (props: Props) => {
  const { section: sectionProp } = props

  const { t } = useTranslation()
  const { assessmentName } = useParams<{ assessmentName: AssessmentName; cycleName: string; sectionName: string }>()

  const cycle = useCycle()
  const countryIso = useCountryIso()
  const subSection = useAssessmentSection(sectionProp)
  const tableSections = useTableSections({ sectionName: subSection?.props.name })
  const canEditTableData = useCanEditTableData(sectionProp)
  const canEditDescriptions = useCanEditDescriptions(sectionProp)
  const { print, onlyTables } = useIsPrint()

  const { showTitle, descriptions, name: sectionName } = subSection?.props ?? {}

  useListenValidationsUpdate({ assessmentName, cycleName: cycle.name, sectionName, countryIso, canEditTableData })
  useListenNodeUpdates({
    countryIso,
    assessmentName,
    cycleName: cycle.name,
  })

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
          {`${onlyTables ? '' : `${anchor} `}${Labels.getLabel({ cycle, labels: subSection.props.labels, t })}`}
        </h2>
      )}

      <SectionHeader assessmentName={assessmentName} sectionName={sectionName} disabled={!canEditTableData} />

      <Descriptions sectionName={sectionName} descriptions={descriptions} disabled={!canEditDescriptions} />
      {showTitle && <Title subSection={subSection} />}

      {tableSections.map((tableSection) => {
        const label = Labels.getLabel({ cycle, labels: tableSection.props.labels, t })
        const description = Labels.getLabel({ cycle, labels: tableSection.props.descriptions, t })
        return (
          <React.Fragment key={tableSection.uuid}>
            {label && <h3 className="subhead assessment-section__table-title">{label}</h3>}
            {description && (
              <div className="app-view__section-toolbar no-print">
                <div className="support-text">{description}</div>
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
          </React.Fragment>
        )
      })}

      {descriptions.introductoryText && (
        <CommentableDescription
          sectionName={sectionName}
          title={t('contactPersons.introductoryText')}
          name="introductoryText"
          template={{ text: t('contactPersons.introductoryTextSupport') }}
          disabled={!canEditDescriptions}
        />
      )}
      {descriptions.comments && <GeneralComments sectionName={sectionName} disabled={!canEditDescriptions} />}

      <div className="page-break" />
    </div>
  )
}

AssessmentSection.defaultProps = {
  section: undefined,
}

export default AssessmentSection
