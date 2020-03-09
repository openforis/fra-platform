import React from 'react'
import { useParams } from 'react-router'
import * as R from 'ramda'

import * as sectionSpecs from '@common/assessment/sectionSpecs'
import { isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'

import DefinitionLink from '@webapp/components/definitionLink'
import useI18n from '@webapp/components/hooks/useI18n'

const AssessmentSectionView = () => {

  const { assessmentType, section } = useParams()
  const sectionSpec = R.path([assessmentType, section], sectionSpecs)
  // console.log(sectionSpec)

  const { sectionName, sectionAnchor, descriptionKey, tableSections, descriptions } = sectionSpec

  const i18n = useI18n()

  return (
    <>
      <h2 className="title only-print">
        {`${isPrintingOnlyTables() ? '' : sectionAnchor}${i18n.t(`${sectionName}.${sectionName}`)}`}
      </h2>

      <div className="app-view__content">
        {/*descriptions components*/}

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

      </div>

    </>
  )

}

export default AssessmentSectionView
