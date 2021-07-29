import '../AssessmentSection.scss'
import React from 'react'
import { useSelector } from 'react-redux'

import { AssessmentType } from '@core/assessment'
import { useI18n, usePrintView } from '@webapp/components/hooks'
import * as FraState from '@webapp/app/assessment/fra/fraState'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import { SectionHeader } from '@webapp/components/Assessment'
import Title from '@webapp/app/assessment/components/section/components/title'
import Descriptions from '@webapp/app/assessment/components/section/components/descriptions'
import DataTable from '@webapp/app/assessment/components/dataTable'
import GeneralComments from '@webapp/app/assessment/components/section/components/descriptions/components/generalComments'

type Props = {
  assessmentType: AssessmentType
  sectionName: string
}

const AssessmentSectionView: React.FC<Props> = (props) => {
  const { assessmentType, sectionName } = props

  const i18n = useI18n()
  const [printView, printOnlyTablesView] = usePrintView()
  const isSectionDisabled = useSelector(FraState.isSectionEditDisabled(sectionName))
  const panEuropean = assessmentType === AssessmentType.panEuropean
  const disabled = panEuropean || isSectionDisabled
  const sectionSpec: any = SectionSpecs.getSectionSpec(assessmentType, sectionName)
  const { sectionAnchor, tableSections, showTitle, descriptions } = sectionSpec

  return (
    <div className={`app-view__content assessment-section__${sectionName}`}>
      {showTitle && printView && (
        <h2 className="title only-print">
          {`${printOnlyTablesView ? '' : `${sectionAnchor} `}${i18n.t(`${sectionName}.${sectionName}`)}`}
        </h2>
      )}

      <SectionHeader assessmentType={assessmentType} sectionName={sectionName} disabled={disabled} />

      {!panEuropean && <Descriptions sectionName={sectionName} descriptions={descriptions} disabled={disabled} />}

      {showTitle && <Title assessmentType={assessmentType} sectionName={sectionName} sectionAnchor={sectionAnchor} />}

      {tableSections.map((tableSection: any) => (
        <div key={tableSection.idx}>
          {tableSection.titleKey && (
            <h3 className="subhead assessment-section__table-title">{i18n.t(tableSection.titleKey)}</h3>
          )}
          {tableSection.descriptionKey && (
            <div className="app-view__section-toolbar no-print">
              <div className="support-text">{i18n.t(tableSection.descriptionKey)}</div>
            </div>
          )}

          {tableSection.tableSpecs.map((tableSpec: any) => (
            <React.Fragment key={tableSpec.name}>
              <DataTable
                assessmentType={assessmentType}
                sectionName={sectionName}
                sectionAnchor={sectionAnchor}
                tableSpec={tableSpec}
                disabled={disabled}
              />
              {tableSpec[SectionSpec.KEYS_TABLE.print][SectionSpec.KEYS_TABLE_PRINT.pageBreakAfter] && (
                <div className="page-break" />
              )}
            </React.Fragment>
          ))}
        </div>
      ))}

      {descriptions.comments && <GeneralComments section={sectionName} disabled={disabled} />}

      <div className="page-break" />
    </div>
  )
}

export default AssessmentSectionView
