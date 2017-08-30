import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchItem, save, saveMany, generateFraValues} from '../originalDataPoint/actions'
import { Link } from './../link'
import DefinitionLink from './../reusableUiComponents/definitionLink'
import ChartWrapper from './chart/chartWrapper'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import { DataTable } from '../originalDataPoint/commentableDatatable'
import CommentableDescriptions from '../description/commentableDescription'

const NationalDataEntry = (props) => {

  const disableGenerateFRAValues = () => {
    const odps = R.pipe(
      R.values,
      R.filter(v => v.type === 'odp')
    )(props.fra)
    return props.generatingFraValues || odps.length < 2
  }

  const i18n = props.i18n
  const rows = [
    {
      field: 'forestArea',
      localizedName: i18n.t('extentOfForest.forestArea')
    },
    {
      field: 'otherWoodedLand',
      localizedName: i18n.t('fraClass.otherWoodedLand')
    },
    {
      field: 'otherLand',
      localizedName: i18n.t('fraClass.otherLand')
    }
  ]
  const rowNames = {
  0: 'forestArea',
  1: 'otherWoodedLand',
  2: 'otherLand'
  }

  return <div className='nde__data-input-component'>
    <div className="nde__data-page-header">
      <h2 className="headline">{i18n.t('extentOfForest.extentOfForest')}</h2>
    </div>
    <div className='nde__comment-transition'>
      <div className="nde__data-input-header">
        <Link className="btn btn-primary" to={`/country/${props.countryIso}/odp`}>
          <svg className="icon icon-middle icon-white">
            <use href="img/icons.svg#small-add"/>
          </svg>
          {i18n.t('nationalDataPoint.addNationalDataPoint')}
        </Link>
      </div>
      <ChartWrapper stateName="nationalDataEntry" trends={['forestArea', 'otherWoodedLand']} showNoDataText={true}/>
      <div className="nde__data-table-header">
        <div>
        <h3 className="subhead">{i18n.t('extentOfForest.extentOfForestValues')}</h3>
        <DefinitionLink name="eof" i18n={i18n}/>
        </div>
        <button disabled={disableGenerateFRAValues()} className="btn btn-primary"
                onClick={() => props.generateFraValues('eof', props.countryIso)}>
          {i18n.t('extentOfForest.generateFraValues')}
        </button>
      </div>
    </div>
    <DataTable section='eof' rows={rows} rowNames={rowNames} {...props} />
    <CommentableDescriptions
      section='EOF'
      name="extentOfForest"
      countryIso={props.match.params.countryIso}
      i18n={i18n}
    />
  </div>
}

class DataFetchingComponent extends React.Component {
  componentWillMount () {
    this.fetch(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
  }

  fetch (countryIso) {
    this.props.fetchItem('eof', countryIso)
  }

  render () {
    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <NationalDataEntry {...this.props} countryIso={this.props.match.params.countryIso}/>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state =>
  ({
    ...state.nationalDataEntry,
    'openCommentThread': state.review.openThread,
    i18n: state.user.i18n
  })

export default connect(mapStateToProps, {save, saveMany, fetchItem, generateFraValues})(DataFetchingComponent)
