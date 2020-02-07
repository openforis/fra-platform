/*
 * Use this view if you have only a single table with the standard description elements etc
 * If you have Anything more custom, e.g. having multiple tables, special markup or styles,
 * just do a custom view and use TraditionalTable, CommentableDescriptions etc. directly instead!
 */

import React from 'react'
import { connect } from 'react-redux'
import TraditionalTable from '@webapp/traditionalTable/traditionalTable'
import NationalDataDescriptions from '@webapp/descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/descriptionBundles/analysisDescriptions'
import GeneralComments from '@webapp/descriptionBundles/generalComments'
import { fetchLastSectionUpdateTimestamp } from '@webapp/audit/actions'
import DefinitionLink from '@webapp/components/definitionLink'
import { isFRA2020SectionEditDisabled } from '@webapp/utils/assessmentAccess'
import * as R from 'ramda'
import * as table from './table'
import { isPrintingOnlyTables } from '@webapp/loggedin/printAssessment/printAssessment'
import FraUtils from '@common/fraUtils'
import { fetchTableData } from './actions'

import * as UserState from '@webapp/user/userState'
class SingleTraditionalTableView extends React.Component {

  componentDidMount () {
    const { match, tableSpecInstance, fetchTableData, fetchLastSectionUpdateTimestamp } = this.props
    const countryIso = match.params.countryIso

    fetchTableData(countryIso, tableSpecInstance)
    fetchLastSectionUpdateTimestamp(countryIso, tableSpecInstance.name)
  }

  render () {
    const {
      match,
      i18n,
      headingLocalizationKey,
      headingDetailsLocalizationKey,
      sectionAnchor,
      tadAnchor,
      faqAnchor,
      useNationalDataDescriptions,
      useAnalysisDescriptions,
      tableSpecInstance,
      isEditDataDisabled,
      tableData
    } = this.props

    const countryIso = match.params.countryIso

    const render = isPrintingOnlyTables() ? FraUtils.hasData(tableData) : true

    return render &&
      <>

        <h2 className="title only-print">
          {
            !isPrintingOnlyTables() &&
            <span className="only-print">{`${sectionAnchor ? sectionAnchor : tadAnchor} `}&nbsp;</span>
          }
          {i18n.t(headingLocalizationKey)}
          {headingDetailsLocalizationKey ? ` (${i18n.t(headingDetailsLocalizationKey)})` : null}
        </h2>

        <div className="fra-view__content">
          {
            useNationalDataDescriptions === false
              ? null
              : <NationalDataDescriptions section={tableSpecInstance.name} countryIso={countryIso}
                                          disabled={isEditDataDisabled}/>
          }
          {
            // Default is that we show the analysisDescriptions if this prop doesn't exist
            useAnalysisDescriptions === false
              ? null
              : <AnalysisDescriptions section={tableSpecInstance.name} countryIso={countryIso}
                                      disabled={isEditDataDisabled}/>
          }
          <h2 className="headline no-print">
            {i18n.t(headingLocalizationKey)}
            {headingDetailsLocalizationKey ? ` (${i18n.t(headingDetailsLocalizationKey)})` : null}
          </h2>
          <div className="fra-view__section-toolbar">
            <DefinitionLink className="margin-right-big" document="tad"
                            anchor={sectionAnchor ? sectionAnchor : tadAnchor}
                            title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
            <DefinitionLink className="align-left" document="faq" anchor={sectionAnchor ? sectionAnchor : faqAnchor}
                            title={i18n.t('definition.faqLabel')} lang={i18n.language}/>
          </div>
          <TraditionalTable tableSpec={tableSpecInstance}
                            countryIso={match.params.countryIso}
                            disabled={isEditDataDisabled}
                            tableDataFetched={true}/>
          <GeneralComments section={tableSpecInstance.name} countryIso={countryIso} disabled={isEditDataDisabled}/>
        </div>

      </>

  }
}

const mapStateToProps = (state, props) => {
  const tableSpecInstance = props.tableSpecInstance || props.tableSpec(UserState.getI18n(state))
  return {
    i18n: UserState.getI18n(state),
    tableSpecInstance,
    isEditDataDisabled: isFRA2020SectionEditDisabled(state, tableSpecInstance.name),
    tableData: R.path(['traditionalTable', tableSpecInstance.name, 'tableData'], state) || table.createTableData(tableSpecInstance),
  }
}

export default connect(mapStateToProps, { fetchLastSectionUpdateTimestamp, fetchTableData })(SingleTraditionalTableView)
