import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import mainTableSpec from './mainTableSpec'
import { DataSourceDescriptionAndComments } from '../../descriptionBundles/dataSourceDescriptionAndComments'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'

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
      {type: 'textInput'}
    ]
  ],
  valueSlice: {
    columnStart: 1
  }
})

class NonWoodForestProductsRemovalsView extends React.Component {
  componentWillMount() {
    this.props.fetchLastSectionUpdateTimestamp(
      this.props.match.params.countryIso,
      'nonWoodForestProductsRemovals'
    )
  }

  render() {
    const {match, i18n} = this.props
    const mainTableSpecInstance = mainTableSpec(i18n)

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <div className="fra-view__page-header">
          <h1 className="title">{i18n.t('nonWoodForestProductsRemovals.nonWoodForestProductsRemovals')}</h1>
          <div className="fra-view__header-secondary-content">
            <DefinitionLink document="tad" anchor="7c" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
            <DefinitionLink document="faq" anchor="7c" title={i18n.t('definition.faqLabel')} lang={i18n.language}/>
          </div>
        </div>
        <TraditionalTable tableSpec={mainTableSpecInstance} countryIso={match.params.countryIso}/>
        <div className="fra-secondary-table__wrapper">
          <TraditionalTable tableSpec={currencyNameTableSpec(i18n)} countryIso={match.params.countryIso}/>
        </div>
        <DataSourceDescriptionAndComments
          section={mainTableSpecInstance.name}
          name="nonWoodForestProductsRemovals"
          countryIso={match.params.countryIso}
          i18n={i18n}
        />
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(NonWoodForestProductsRemovalsView)
