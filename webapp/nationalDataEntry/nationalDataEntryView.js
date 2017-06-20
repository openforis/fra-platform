import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { save, fetch, generateFraValues } from './actions'
import { Link } from './../link'
import Chart from './chart/chart'
import IssueWidget from '../issue/issueWidget'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import ckEditorConfig, { isEditorReady } from '../ckEditor/ckEditorConfig'

const OdpHeading = ({countryIso, odpValue}) =>
  <Link to={`/country/${countryIso}/odp/${odpValue.odpId}`}>
    {odpValue.draft ? '!' : ''}
    {odpValue.name}
  </Link>

class DataTable extends React.Component {
  render () {
    return <div className="nde__data-table-container">
      <div className="nde__input-table">
        <div className="nde__input-table-heading">
          <div className="nde__input-table-content-row-header-cell"/>
          {
            R.values(this.props.fra).map(v =>
              <div className={`nde__input-header-cell nde__input-header-cell_${v.type}`} key={`${v.type}_${v.name}`}>
                { v.type === 'odp' ? <OdpHeading countryIso={this.props.countryIso} odpValue={v}/>
                  : v.name
                }
              </div>
            )
          }
        </div>
        { fraValueRow('Forest area', 'forest', this.props.countryIso, 'forestArea', this.props.fra, this.props.save) }
        { fraValueRow('Other wooded land', 'otherWoodedLand', this.props.countryIso, 'otherWoodedLand', this.props.fra, this.props.save) }
        { fraValueRow('Other land', 'otherLand', this.props.countryIso, 'otherLand', this.props.fra, this.props.save) }
      </div>
      <div className="nde__comment-column">
        <div className="nde__comment-cell"><IssueWidget target={['forest']}
                                                        countryIso={this.props.countryIso}
                                                        section='EOF'/></div>
        <div className="nde__comment-cell"><IssueWidget section='EOF'
                                                        target={['otherWoodedLand']}
                                                        countryIso={this.props.countryIso}/></div>
        <div className="nde__comment-cell"><IssueWidget section='EOF'
                                                        target={['otherLand']}
                                                        countryIso={this.props.countryIso}/></div>
      </div>
    </div>
  }
}

const fraValueRow = (rowHeading, target, countryIso, field, fra, save) =>
  <div className="nde__input-table-content">
    <div className="nde__input-table-content-row-header-cell">{ rowHeading }</div>
    {
      R.values(fra).map(v =>
        <div className="nde__input-table-content-cell" key={`${v.type}_${v.name}`}>
          {
            v.type === 'odp'
              ? odpCell(v, field)
              : fraValueCell(v, fra, countryIso, save, field)
          }
        </div>
      )
    }
  </div>

const fraFieldValueForInput = (fieldValue) =>
  typeof fieldValue === 'number'
    ? fieldValue
    : ''

const fraValueCell = (fraValue, fra, countryIso, save, field) =>
  <ThousandSeparatedIntegerInput
    className="nde__input-table-input"
    integerValue={ fraValue[field] }
    onChange={ e => { save(countryIso, fraValue.name, e.target.value, fraValue, field) } }/>

const odpCell = (odpValue, field) =>
  <span className="nde__input-table-cell_odp">
    {odpValue[field]}
  </span>

class ChartWrapper extends React.Component {

  constructor () {
    super()
    this.resizeListener = () => this.forceUpdate()
  }

  componentDidMount () {
    window.addEventListener('resize', this.resizeListener, true)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeListener, true)
  }

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

  const marginClass = R.isNil(props.openCommentThread) ? 'nde__comment-margin' : 'nde__comment-thread-margin'

  return <div className={`nde__data-input-component`}>
    <div className="nde__data-page-header">
      <h2 className="headline">Extent of forest</h2>
    </div>
    <div className={`${marginClass}`}>
      <div className="nde__data-input-header">
        <Link className="btn btn-primary" to={`/country/${props.countryIso}/odp`}>
          <svg className="icon icon-middle icon-white">
            <use xlinkHref="img/icon.svg#icon-small-add"/>
          </svg>
          Add national data point
        </Link>
      </div>
      <ChartWrapper/>
      <div className="nde__data-table-header">
        <h3 className="subhead">Extent of forest values</h3>
        <button disabled={ disableGenerateFRAValues() } className="btn btn-primary"
                onClick={() => props.generateFraValues(props.countryIso)}>Generate FRA values
        </button>
      </div>
    </div>
    <DataTable {...props} />
    <h3 className="subhead nde__description-header">Data Sources</h3>
    <textarea id="dataSourcesDescription"/>
    <h3 className="subhead nde__description-header">National classification and definitions</h3>
    <textarea id="nationalClassificationDescription"/>
    <h3 className="subhead nde__description-header">Original data</h3>
    <textarea id="originalDataDescription"/>

  </div>
}

class DataFetchingComponent extends React.Component {

  initDescriptionEditor (editor) {
    editor.on('change', evt => {
    })
  }

  setEditorData (props, editor, field) {
    editor.setData(
      props.eofDescriptions[field],
      {callback: this.initDescriptionEditor(editor)})
  }

  componentDidMount () {
    this.dataSourcesDescription = CKEDITOR.replace(document.getElementById('dataSourcesDescription'), ckEditorConfig)
    this.nationalClassificationDescription = CKEDITOR.replace(document.getElementById('nationalClassificationDescription'), ckEditorConfig)
    this.originalDataDescription = CKEDITOR.replace(document.getElementById('originalDataDescription'), ckEditorConfig)

    // Data fetching is necessary when CKEDITOR instances are ready
    const fetchWhenReady = () => {
      if (isEditorReady(this.dataSourcesDescription) && isEditorReady(this.nationalClassificationDescription) && isEditorReady(this.originalDataDescription))
        this.fetch(this.props.match.params.countryIso)
    }
    this.dataSourcesDescription.on('instanceReady', fetchWhenReady)
    this.nationalClassificationDescription.on('instanceReady', fetchWhenReady)
    this.originalDataDescription.on('instanceReady', fetchWhenReady)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso)) {
      this.fetch(next.match.params.countryIso)
    } else if (next.eofDescriptions) {
      this.setEditorData(next, this.dataSourcesDescription, 'dataSources')
      this.setEditorData(next, this.nationalClassificationDescription, 'nationalClassification')
      this.setEditorData(next, this.originalDataDescription, 'originalData')
    }
  }

  fetch (countryIso) {
    this.props.fetch(countryIso)
  }

  render () {
    return <LoggedInPageTemplate>
      <NationalDataEntry {...this.props} countryIso={this.props.match.params.countryIso}/>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => R.merge(state.nationalDataEntry, {'openCommentThread': state.issue.openThread})

export default connect(mapStateToProps, {save, fetch, generateFraValues})(DataFetchingComponent)
