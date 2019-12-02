import React from 'react'
import { connect } from 'react-redux'

import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'
import { fetchItem } from '../../tableWithOdp/actions'

class SpecificForestCategories extends React.Component {

  getCountryIso (props) {
    return props.match.params.countryIso
  }

  fetchForestCharacteristics (countryIso) {
    this.props.fetchItem('forestCharacteristics', countryIso)
  }

  componentDidMount () {
    this.fetchForestCharacteristics(this.getCountryIso(this.props))
  }

  componentDidUpdate(prevProps, prevState) {
    const currentCountryIso = this.getCountryIso(this.props)
    const previousCountryIso = this.getCountryIso(prevProps)
    if (currentCountryIso !== previousCountryIso)
      this.fetchForestCharacteristics(currentCountryIso)
  }

  render () {
    const {i18n, extentOfForest, forestCharacteristics} = this.props

    return <SingleTraditionalTableView
      {...this.props}
      headingLocalizationKey="specificForestCategories.specificForestCategories"
      sectionAnchor="1e"
      tableSpecInstance={tableSpec(i18n, extentOfForest, forestCharacteristics)}/>
  }

}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  extentOfForest: state.extentOfForest,
  forestCharacteristics: state.forestCharacteristics
})

export default connect(mapStateToProps, {fetchItem})(SpecificForestCategories)
