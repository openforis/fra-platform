import './assessmentSectionView.less'

import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import CustomHeader from '@webapp/app/assessment/components/section/components/customHeader'
import Title from '@webapp/app/assessment/components/section/components/title'
import Descriptions from '@webapp/app/assessment/components/section/components/descriptions'
import DataTable from '@webapp/app/assessment/components/dataTable'
import GeneralComments from '@webapp/app/assessment/components/section/components/descriptions/components/generalComments'
import { useI18n, usePrintView } from '@webapp/components/hooks'

import * as FraState from '@webapp/app/assessment/fra/fraState'
import { isTypePanEuropean } from '@common/assessment/assessment'

const AssessmentSection = (props) => {
  const { assessmentType, sectionName } = props
  const sectionSpec = SectionSpecs.getSectionSpec(assessmentType, sectionName)

  const { sectionAnchor, tableSections, showTitle, descriptions } = sectionSpec

  const i18n = useI18n()
  const [printView, printOnlyTablesView] = usePrintView()
  const isSectionDisabled = useSelector(FraState.isSectionEditDisabled(sectionName))
  const disabled = isTypePanEuropean(assessmentType) || isSectionDisabled

  return (
    <div className={`app-view__content assessment-section__${sectionName}`}>
      {showTitle && printView && (
        <h2 className="title only-print">
          {`${printOnlyTablesView ? '' : `${sectionAnchor} `}${i18n.t(`${sectionName}.${sectionName}`)}`}
        </h2>
      )}

      <CustomHeader assessmentType={assessmentType} sectionName={sectionName} disabled={disabled} />

      {!isTypePanEuropean(assessmentType) && (
        <Descriptions sectionName={sectionName} descriptions={descriptions} disabled={disabled} />
      )}

      {showTitle && <Title assessmentType={assessmentType} sectionName={sectionName} sectionAnchor={sectionAnchor} />}

      {tableSections.map((tableSection) => (
        <div key={tableSection.idx}>
          {tableSection.titleKey && (
            <h3 className="subhead assessment-section__table-title">{i18n.t(tableSection.titleKey)}</h3>
          )}
          {tableSection.descriptionKey && (
            <div className="app-view__section-toolbar no-print">
              <div className="support-text">{i18n.t(tableSection.descriptionKey)}</div>
            </div>
          )}

          {tableSection.tableSpecs.map((tableSpec) => (
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

AssessmentSection.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
}

export default AssessmentSection
