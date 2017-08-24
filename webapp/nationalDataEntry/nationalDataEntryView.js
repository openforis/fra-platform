import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { generateFraValues } from './actions'
import { fetchItem, save, saveMany } from '../originalDataPoint/actions'
import { Link } from './../link'
import Chart from './chart/chart'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import UpdateOnResizeReactComponent from '../reusableUiComponents/updateOnResizeReactComponent'
import { DataTable } from '../originalDataPoint/commentableDatatable'
import CommentableDescriptions from '../description/commentableDescription'

class ChartWrapper extends UpdateOnResizeReactComponent {
  render () {
    const defaultWidth = 913 //TODO what's a good default before we have bounding rect?
    const width = this.refs.chartWrapper ? this.refs.chartWrapper.getBoundingClientRect().width : defaultWidth
    return <div ref="chartWrapper" className="nde__data-chart">
      <Chart wrapperWidth={width}/>
    </div>
  }
}

const NationalDataEntry = (props) => {

  const disableGenerateFRAValues = () => {
    const odps = R.pipe(
      R.values,
      R.filter(v => v.type === 'odp')
    )(props.fra)
    return props.generatingFraValues || odps.length < 2
  }

  const sourceTarget = ['data_sources']
  const originalDataTarget = ['original_data']
  const classificationTarget = ['national_classifications']
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
      <ChartWrapper/>
      <div className="nde__data-table-header">
        <h3 className="subhead">{i18n.t('extentOfForest.extentOfForestValues')}</h3>
        <button disabled={ disableGenerateFRAValues() } className="btn btn-primary"
                onClick={() => props.generateFraValues(props.countryIso)}>
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

  fetch(countryIso) {
    this.props.fetchItem('eof', countryIso)
  }

  render () {
    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <NationalDataEntry {...this.props} countryIso={this.props.match.params.countryIso}/>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state =>
  ({...state.nationalDataEntry,
    'openCommentThread': state.review.openThread,
    i18n: state.user.i18n
  })

export default connect(mapStateToProps, {save, saveMany, fetchItem, generateFraValues})(DataFetchingComponent)
