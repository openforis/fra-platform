import './style.less'

import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import TraditionalTable from '@webapp/app/assessment/components/traditionalTable/traditionalTable'
import mainTableSpec, { sectionName } from './mainTableSpec'
import DefinitionLink from '@webapp/components/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'
import NationalDataDescriptions from '@webapp/app/assessment/components/section/components/descriptions/components/nationalDataDescriptions'
import GeneralComments from '@webapp/app/assessment/components/section/components/descriptions/components/generalComments'
import { fetchTableData } from '@webapp/app/assessment/components/traditionalTable/actions'
import * as table from '@webapp/app/assessment/components/traditionalTable/table'
import { isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'
import FraUtils from '@common/fraUtils'
import * as AppState from '@webapp/app/appState'
import * as FraState from '@webapp/app/assessment/fra/fraState'

const currencyNameTableSpec = i18n => ({
  name: 'nonWoodForestProductsRemovalsCurrency',
  header: <thead/>,
  disableReviewComments: true,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <td className="fra-secondary-table__heading-cell">
          {i18n.t('nonWoodForestProductsRemovals.currency')}
        </td>
      },
      { type: 'textInput' }
    ]
  ],
  valueSlice: {
    columnStart: 1
  }
})

const NonWoodForestProductsRemovalsView = props => {
  const {
    i18n,
    disabled,
    tableSpecInstance,
    tableData,
    fetchTableData,
    fetchLastSectionUpdateTimestamp,
  } = props
  const countryIso = useSelector(AppState.getCountryIso)

  const render = isPrintingOnlyTables() ? FraUtils.hasData(tableData) : true

  useEffect(() => {
    fetchTableData(countryIso, tableSpecInstance)
    fetchLastSectionUpdateTimestamp(countryIso, tableSpecInstance.name)
  }, [])

  if (!render) return null
  return <>

    <h2 className="title only-print">
      {`${isPrintingOnlyTables() ? '' : '7c '}${i18n.t('nonWoodForestProductsRemovals.nonWoodForestProductsRemovals')}`}
    </h2>

    <div className="app-view__content">
      <NationalDataDescriptions section={tableSpecInstance.name} countryIso={countryIso}
                                disabled={disabled}/>
      <h2 className="headline no-print">
        {i18n.t('nonWoodForestProductsRemovals.nonWoodForestProductsRemovals')}
      </h2>
      <div className="app-view__section-toolbar">
        <DefinitionLink className="margin-right-big" document="tad" anchor="7c"
                        title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
        <DefinitionLink className="align-left" document="faq" anchor="7c" title={i18n.t('definition.faqLabel')}
                        lang={i18n.language}/>
      </div>

      {
        !isPrintingOnlyTables() &&
        <div className="page-break" />
      }

      <TraditionalTable tableSpec={tableSpecInstance} countryIso={countryIso}
                        disabled={disabled}/>
      <div className="page-break"/>
      <div className="fra-secondary-table__wrapper">
        <TraditionalTable tableSpec={currencyNameTableSpec(i18n)} countryIso={countryIso}
                          disabled={disabled}/>
      </div>
      <GeneralComments
        section={tableSpecInstance.name}
        countryIso={countryIso}
        disabled={disabled}
      />
    </div>
  </>
}

const mapStateToProps = state => {
  const i18n = AppState.getI18n(state)
  const tableSpecInstance = mainTableSpec(i18n)

  return {
    i18n,
    disabled: FraState.isSectionEditDisabled(sectionName)(state),
    tableSpecInstance,
    tableData: R.path(['traditionalTable', tableSpecInstance.name, 'tableData'], state) || table.createTableData(tableSpecInstance),
  }
}

export default connect(mapStateToProps, {
  fetchLastSectionUpdateTimestamp,
  fetchTableData
})(NonWoodForestProductsRemovalsView)
