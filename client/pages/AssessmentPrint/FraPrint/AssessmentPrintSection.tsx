import './AssessmentSection.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { AssessmentName } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useAssessment, useAssessmentSection, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions, useTableSections } from '@client/store/pages/assessmentSection'
import { useCanEditSection } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

import DataTable from './DataTable'
import Descriptions, { GeneralComments } from './Descriptions'
import SectionHeader from './SectionHeader'
import Title from './Title'

interface Props {
  section?: any
}

const AssessmentSection: React.FC<Props> = (props: Props) => {
  const { section } = props
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  const { i18n } = useTranslation()
  const { assessmentName } = useParams<{ assessmentName: AssessmentName; cycleName: string; section: string }>()
  const assessmentSection = section // useAssessmentSection()
  const tableSections = useTableSections({ sectionName: assessmentSection?.props?.name })
  const canEditSection = false // useCanEditSection()
  const [printView, printOnlyTablesView] = [true, true] // TODO: usePrintView()

  const panEuropean = assessmentName === AssessmentName.panEuropean
  const disabled = panEuropean || !canEditSection
  console.log(tableSections, section?.props.name)
  useEffect(() => {
    // fetch table sections metadata
    dispatch(
      AssessmentSectionActions.getTableSections({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        section: section?.props.name,
        countryIso,
      })
    )
  }, [section])

  if (!assessmentSection) return null

  const { anchor, showTitle, descriptions, name: sectionName } = assessmentSection.props

  return (
    <div className={`app-view__content assessment-section__${sectionName}`}>
      {showTitle && printView && (
        <h2 className="title only-print">
          {`${printOnlyTablesView ? '' : `${anchor} `}${i18n.t<string>(`${sectionName}.${sectionName}`)}`}
        </h2>
      )}

      <SectionHeader assessmentName={assessmentName} sectionName={sectionName} disabled={disabled} />

      {!panEuropean && <Descriptions sectionName={sectionName} descriptions={descriptions} disabled={disabled} />}

      {showTitle && <Title assessmentName={assessmentName} sectionName={sectionName} sectionAnchor={anchor} />}

      {tableSections.map((tableSection) => (
        <div key={String(tableSection.id)}>
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
                disabled={disabled}
              />
              {table.props.print?.pageBreakAfter && <div className="page-break" />}
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
