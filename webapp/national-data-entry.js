import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import * as R from "ramda"
import axios from "axios"

const DataTable = ({columns, valueChange}) =>
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
              value={v.value}
              onChange={ e => {valueChange(v.name, e.currentTarget.value)}}/>
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

const NationalDataEntry = ({match, data, valueChange}) => {
  console.log("data", data)
  return <div>
    <Link to="/">Back home</Link>
    <h3>{match.params.countryIso}</h3>
    <DataInput name="Forest area" columns={data} valueChange={valueChange}/>
  </div>
}

const mapstateToProps = R.identity

const changedValue = ({name, value}) => ({type: 'CHANGED_VALUE', name, value})
const changeStart = () => ({type: 'CHANGE_START'})

const valueChange = (name, value) => dispatch => {
  dispatch(changeStart())
  return axios.post('/api/data', {name, value}).then(() => {
    dispatch(changedValue({name, value}))
  })
}

export default connect(mapstateToProps, {valueChange})(NationalDataEntry)
