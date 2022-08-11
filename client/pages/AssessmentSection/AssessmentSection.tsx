import './AssessmentSection.scss'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { AssessmentName } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useAssessment, useAssessmentSection, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions, useTableSections } from '@client/store/pages/assessmentSection'
import { useCanEditSection } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
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
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const { assessmentName } = useParams<{ assessmentName: AssessmentName; cycleName: string; section: string }>()
  const assessmentSection = useAssessmentSection(sectionProp)
  const tableSections = useTableSections({ sectionName: assessmentSection.props?.name })
  const canEditSection = useCanEditSection(sectionProp)
  const { print, onlyTables } = useIsPrint()

  const panEuropean = assessmentName === AssessmentName.panEuropean
  const disabled = panEuropean || !canEditSection

  const shouldFetchTableSections = useRef(tableSections.length === 0)

  useEffect(() => {
    if (shouldFetchTableSections.current) {
      shouldFetchTableSections.current = false
      dispatch(
        AssessmentSectionActions.getTableSections({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          section: assessmentSection.props.name,
          countryIso,
        })
      )
    }
  }, [tableSections, assessment.props.name, countryIso, cycle.name, dispatch, assessmentSection.props.name, print])

  const { anchor, showTitle, descriptions, name: sectionName } = assessmentSection.props

  return (
    <div className={`app-view__content assessment-section__${sectionName}`}>
      {showTitle && print && (
        <h2 className="title only-print">
          {`${onlyTables ? '' : `${anchor} `}${i18n.t<string>(`${sectionName}.${sectionName}`)}`}
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

AssessmentSection.defaultProps = {
  section: undefined,
}

export default AssessmentSection
