import "./style.less"
import React from "react"
import { connect } from "react-redux"
import * as R from "ramda"
import { save, fetch } from "./actions"

const DataTable = ({reportingYears, save, countryIso}) =>
  <table className="nde__input-table">
    <thead>
    <tr>
      {
        R.keys(reportingYears).map(v =>
          <th key={v}>{v}</th>
        )
      }
    </tr>
    </thead>
    <tbody>
    <tr>
      {
        R.values(reportingYears).map(v =>
          <td key={v.name}>
            <input
              value={v.value || ''}
              onChange={ e => {save(countryIso, v.name, e.currentTarget.value, {reportingYears})}}/>
          </td>
        )
      }
    </tr>
    </tbody>
  </table>

const DataInput = (props) => {
  return <div className="nde__data-input-component">
    <h2>{props.name}</h2>
      <span className="nde__status-indicator">{props.status}</span>
    <DataTable {...props} />
  </div>
}

const NationalDataEntry = (props) => {
  return <div>
    <DataInput {...props} name="Forest area"/>
  </div>
}

class DataFetchingComponent extends React.Component {
  componentWillMount() {
    this.props.fetch(this.props.match.params.countryIso)
  }
  render() {
    return <NationalDataEntry {...this.props} countryIso={this.props.match.params.countryIso} />
  }
}


const mapstateToProps = state => {
  console.log("props state", state)
  return state['nationalDataEntry']
}

export default connect(mapstateToProps, {save, fetch})(DataFetchingComponent)
