import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import mainTableSpec, { sectionName } from './mainTableSpec'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'
import { isFRA2020SectionEditDisabled } from '../../utils/assessmentAccess'
import { fetchTableData } from '../../traditionalTable/actions'
import * as table from '../../traditionalTable/table'
import { isPrintingOnlyTables } from '../../printAssessment/printAssessment'
import FraUtils from '../../../common/fraUtils'

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

class NonWoodForestProductsRemovalsView extends React.Component {

  componentWillMount () {
    const countryIso = this.props.match.params.countryIso
    const tableSpec = this.props.tableSpecInstance

    this.props.fetchTableData(countryIso, tableSpec)
    this.props.fetchLastSectionUpdateTimestamp(countryIso, tableSpec.name)
  }

  render () {
    const { match, i18n, isEditDataDisabled, tableSpecInstance, tableData } = this.props

    const render = isPrintingOnlyTables() ? FraUtils.hasData(tableData) : true

    return render &&
      <LoggedInPageTemplate>

        <h2 className="title only-print">
          {`${isPrintingOnlyTables() ? '' : '7c '}${i18n.t('nonWoodForestProductsRemovals.nonWoodForestProductsRemovals')}`}
        </h2>

        <div className="fra-view__content">
          <NationalDataDescriptions section={tableSpecInstance.name} countryIso={match.params.countryIso}
                                    disabled={isEditDataDisabled}/>
          <h2 className="headline no-print">
            {i18n.t('nonWoodForestProductsRemovals.nonWoodForestProductsRemovals')}
          </h2>
          <div className="fra-view__section-toolbar">
            <DefinitionLink className="margin-right-big" document="tad" anchor="7c"
                            title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
            <DefinitionLink className="align-left" document="faq" anchor="7c" title={i18n.t('definition.faqLabel')}
                            lang={i18n.language}/>
          </div>
          <TraditionalTable tableSpec={tableSpecInstance} countryIso={match.params.countryIso}
                            disabled={isEditDataDisabled}/>
          <div className="page-break"/>
          <div className="fra-secondary-table__wrapper">
            <TraditionalTable tableSpec={currencyNameTableSpec(i18n)} countryIso={match.params.countryIso}
                              disabled={isEditDataDisabled}/>
          </div>
          <GeneralComments
            section={tableSpecInstance.name}
            countryIso={match.params.countryIso}
            disabled={isEditDataDisabled}
          />
        </div>
      </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => {
  const i18n = state.user.i18n
  const tableSpecInstance = mainTableSpec(i18n)

  return {
    i18n,
    isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName),
    tableSpecInstance,
    tableData: R.path(['traditionalTable', tableSpecInstance.name, 'tableData'], state) || table.createTableData(tableSpecInstance),
  }
}

export default connect(mapStateToProps, {
  fetchLastSectionUpdateTimestamp,
  fetchTableData
})(NonWoodForestProductsRemovalsView)
