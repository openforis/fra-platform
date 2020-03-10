import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import * as R from 'ramda'

import { isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'
import sectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'

import DefinitionLink from '@webapp/components/definitionLink'
import NationalDataDescriptions from '@webapp/app/assessment/components/description/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/app/assessment/components/description/analysisDescriptions'
import GeneralComments from '@webapp/app/assessment/components/description/generalComments'
import CommentableDescription from '@webapp/app/assessment/components/description/commentableDescription'
import DataTable from '@webapp/app/assessment/components/dataTable'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'

import * as FraState from '@webapp/app/assessment/fra/fraState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

import { fetchTableData } from '@webapp/app/assessment/components/dataTable/actions'
import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'

const AssessmentSectionView = () => {

  const { assessmentType, section } = useParams()
  const sectionSpec = R.path([assessmentType, section], sectionSpecs)
  const { sectionName, sectionAnchor, tableSections, descriptions } = sectionSpec

  const { introductoryText, nationalData, analysisAndProcessing, comments } = descriptions
  const tableNames = tableSections.map(tableSection =>
    tableSection.tableSpecs.map(tableSpec =>
      tableSpec.name
    )
  ).flat(Infinity)

  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const disabled = useSelector(FraState.isSectionEditDisabled(sectionName))

  const dataEmpties = useSelector(state => tableNames.map(tableName =>
    AssessmentState.isSectionDataEmpty(assessmentType, sectionName, tableNames)(state)
  ))

  //==== Data fetching effect
  useEffect(() => {
    tableNames.forEach(tableName => {
      dispatch(fetchTableData(assessmentType, sectionName, tableName))
    })

    dispatch(fetchLastSectionUpdateTimestamp(countryIso, sectionName))
  }, [sectionName, countryIso])

  // TODO check where the below commented check should go. maybe with
  //==== When printing only tables, component renders if at least one table has data
  if (isPrintingOnlyTables() && R.all(R.identity, dataEmpties)) {
    return null
  }

  return (
    <>
      <h2 className="title only-print">
        {`${isPrintingOnlyTables() ? '' : sectionAnchor + ' '}${i18n.t(`${sectionName}.${sectionName}`)}`}
      </h2>

      <div className="app-view__content">
        {/*descriptions components*/}
        {
          nationalData &&
          <NationalDataDescriptions
            section={sectionName}
            countryIso={countryIso}
            disabled={disabled}
          />
        }
        {
          analysisAndProcessing &&
          <AnalysisDescriptions
            section={sectionName}
            countryIso={countryIso}
            disabled={disabled}
          />
        }
        {
          introductoryText &&
          <CommentableDescription
            section={sectionName}
            title={i18n.t('contactPersons.introductoryText')}
            name='introductoryText'
            template={i18n.t('contactPersons.introductoryTextSupport')}
            disabled={disabled}
          />
        }

        <h2 className="headline no-print">
          {
            i18n.t(`${sectionName}.${sectionName}`)
          }
        </h2>

        <div className="app-view__section-toolbar">
          <DefinitionLink
            className="margin-right-big"
            document="tad"
            anchor={sectionAnchor}
            title={i18n.t('definition.definitionLabel')}
            lang={i18n.language}
          />
          <DefinitionLink
            className="align-left"
            document="faq"
            anchor={sectionAnchor}
            title={i18n.t('definition.faqLabel')}
            lang={i18n.language}
          />
        </div>

        {
          !isPrintingOnlyTables() &&
          <div className="page-break"/>
        }

        {
          tableSections.map((tableSection, i) => (
            <div key={i}>
              {
                tableSection.titleKey &&
                <h3 className="subhead">
                  {
                    i18n.t(tableSection.titleKey)
                  }
                </h3>
              }
              {
                tableSection.descriptionKey &&
                <div className="app-view__section-toolbar">
                  <div className="support-text no-print">
                    {
                      i18n.t(tableSection.descriptionKey)
                    }
                  </div>
                </div>
              }

              {
                tableSection.tableSpecs.map((tableSpec, j) => (
                  <DataTable
                    key={tableSpec.name}
                    assessmentType={assessmentType}
                    sectionName={sectionName}
                    sectionAnchor={sectionAnchor}
                    tableSpec={tableSpec}
                    copyValues={false}
                    disabled={disabled}
                  />
                ))
              }
            </div>
          ))
        }

        {
          comments &&
          <GeneralComments
            section={sectionName}
            countryIso={countryIso}
            disabled={disabled}
          />
        }

      </div>

    </>
  )

}

export default AssessmentSectionView
