import './assessmentSectionView.less'

import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'

import CustomHeader from '@webapp/app/assessment/components/section/components/customHeader'
import Title from '@webapp/app/assessment/components/section/components/title'
import Descriptions from '@webapp/app/assessment/components/section/components/descriptions'
import DataTable from '@webapp/app/assessment/components/dataTable'
import GeneralComments from '@webapp/app/assessment/components/section/components/descriptions/components/generalComments'
import useI18n from '@webapp/components/hooks/useI18n'

import * as FraState from '@webapp/app/assessment/fra/fraState'

const AssessmentSection = forwardRef((props, ref) => {
  const { assessmentType, sectionName } = props
  const sectionSpec = SectionSpecs.getSectionSpec(assessmentType, sectionName)

  const { sectionAnchor, tableSections, showTitle, descriptions } = sectionSpec

  const i18n = useI18n()
  const disabled = useSelector(FraState.isSectionEditDisabled(sectionName))

  return (
    <div className={`app-view__content assessment-section__${sectionName}`} ref={ref}>
      <h2 className="title only-print">
        {`${isPrintingOnlyTables() ? '' : `${sectionAnchor} `}${i18n.t(`${sectionName}.${sectionName}`)}`}
      </h2>

      <CustomHeader assessmentType={assessmentType} sectionName={sectionName} disabled={disabled} />

      <Descriptions sectionName={sectionName} descriptions={descriptions} disabled={disabled} />

      {showTitle && <Title assessmentType={assessmentType} sectionName={sectionName} sectionAnchor={sectionAnchor} />}

      {!isPrintingOnlyTables() && <div className="page-break" />}

      {tableSections.map((tableSection) => (
        <div key={tableSection.idx}>
          {tableSection.titleKey && <h3 className="subhead">{i18n.t(tableSection.titleKey)}</h3>}
          {tableSection.descriptionKey && (
            <div className="app-view__section-toolbar">
              <div className="support-text no-print">{i18n.t(tableSection.descriptionKey)}</div>
            </div>
          )}

          {tableSection.tableSpecs.map((tableSpec) => (
            <DataTable
              key={tableSpec.name}
              assessmentType={assessmentType}
              sectionName={sectionName}
              sectionAnchor={sectionAnchor}
              tableSpec={tableSpec}
              disabled={disabled}
            />
          ))}
        </div>
      ))}

      {descriptions.comments && <GeneralComments section={sectionName} disabled={disabled} />}
    </div>
  )
})

AssessmentSection.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
}

export default AssessmentSection
