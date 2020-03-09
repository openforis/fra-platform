import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import * as R from 'ramda'

import * as sectionSpecs from '@common/assessment/sectionSpecs'
import { isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'

import DefinitionLink from '@webapp/components/definitionLink'
import NationalDataDescriptions from '@webapp/app/assessment/components/description/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/app/assessment/components/description/analysisDescriptions'
import GeneralComments from '@webapp/app/assessment/components/description/generalComments'
import CommentableDescription from '@webapp/app/assessment/components/description/commentableDescription'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'

import * as FraState from '@webapp/app/assessment/fra/fraState'

const AssessmentSectionView = () => {

  const { assessmentType, section } = useParams()
  const sectionSpec = R.path([assessmentType, section], sectionSpecs)
  const { sectionName, sectionAnchor, descriptionKey, tableSections, descriptions } = sectionSpec
  const { introductoryText, nationalData, analysisAndProcessing, comments } = descriptions

  console.log(sectionSpec)

  const countryIso = useCountryIso()
  const i18n = useI18n()
  const disabled = useSelector(FraState.isSectionEditDisabled(sectionName))

  return (
    <>
      <h2 className="title only-print">
        {`${isPrintingOnlyTables() ? '' : sectionAnchor}${i18n.t(`${sectionName}.${sectionName}`)}`}
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
