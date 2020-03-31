import './fraPrintView.less'

import React from 'react'
import { useSelector } from 'react-redux'

import * as Country from '@common/country/country'
import * as Assessment from '@common/assessment/assessment'

import * as AppState from '@webapp/app/appState'
import * as CountryState from '@webapp/app/country/countryState'

import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'

import TableOfContent from '@webapp/app/assessment/fra/print/tableOfContent'

const FraPrintView = () => {
  const countryIso = useCountryIso()
  const i18n = useI18n()

  const printOnlyTablesView = useSelector(AppState.isPrintOnlyTablesView)
  const country = useSelector(CountryState.getCountryByCountryIso(countryIso))
  const assessment = useSelector(CountryState.getAssessmentFra2020)
  const deskStudy = Assessment.getDeskStudy(assessment)

  return (
    <div>
      <div className="fra-print__header">
        <h1>{Country.getListName(i18n.language)(country)}</h1>
        <h2>{deskStudy ? i18n.t('assessment.deskStudy') : null}</h2>
        <h1>{i18n.t(`fraReportPrint.${printOnlyTablesView ? 'titleTables' : 'title'}`)}</h1>
      </div>

      <hr />

      {!printOnlyTablesView && (
        <>
          <div className="page-break" />
          <TableOfContent />
          <div className="page-break" />
        </>
      )}
    </div>
  )
}

export default FraPrintView
