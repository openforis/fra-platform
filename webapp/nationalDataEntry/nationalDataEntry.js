import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import * as R from "ramda"

import {save, fetch} from "./actions"

require('./style.less')

const DataTable = ({columns, save}) =>
  <table>
    <thead>
    <tr>
      {
        R.keys(columns).map(v =>
          <th key={v}>{v}</th>
        )
      }
    </tr>
    </thead>
    <tbody>
    <tr>
      {
        R.values(columns).map(v =>
          <td key={v.name}>
            <input
              className={`nde__input-${v.status}`}
              value={v.value}
              onChange={ e => {save(v.name, e.currentTarget.value, {columns})}}/>
          </td>
        )
      }
    </tr>
    </tbody>
  </table>

const DataInput = ({name, ...props}) =>
  <div>
    <h2>{name}</h2>
    <DataTable {...props} />
  </div>

const NationalDataEntry = ({match, columns, save}) => {
  return <div>
    <Link to="/">Back home</Link>
    <h3>{match.params.countryIso}</h3>
    <DataInput name="Forest area" columns={columns} save={save}/>
  </div>
}

class DataFetchingComponent extends React.Component {
  componentWillMount() {
    this.props.fetch('italy')
  }
  render() {
    return <NationalDataEntry {...this.props} />
  }
}


const mapstateToProps = state => {
  console.log("props state", state)
  return state['nationalDataEntry']
}

export default connect(mapstateToProps, {save, fetch})(DataFetchingComponent)
