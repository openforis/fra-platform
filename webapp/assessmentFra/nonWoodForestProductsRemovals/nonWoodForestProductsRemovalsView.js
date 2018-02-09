import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import mainTableSpec from './mainTableSpec'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'

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
        <NationalDataDescriptions section={mainTableSpecInstance.name} countryIso={match.params.countryIso}/>
        <h2 className="headline">{i18n.t('nonWoodForestProductsRemovals.nonWoodForestProductsRemovals')}</h2>
        <div className="fra-view__section-toolbar">
          <DefinitionLink className="margin-right-big" document="tad" anchor="7c" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
          <DefinitionLink className="align-left" document="faq" anchor="7c" title={i18n.t('definition.faqLabel')} lang={i18n.language}/>
        </div>
        <TraditionalTable tableSpec={mainTableSpecInstance} countryIso={match.params.countryIso}/>
        <div className="fra-secondary-table__wrapper">
          <TraditionalTable tableSpec={currencyNameTableSpec(i18n)} countryIso={match.params.countryIso}/>
        </div>
        <GeneralComments
          section={mainTableSpecInstance.name}
          countryIso={match.params.countryIso}
        />
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(NonWoodForestProductsRemovalsView)
