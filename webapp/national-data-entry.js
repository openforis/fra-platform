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

const NationalDataEntry = ({match, columns, valueChange}) => {
  console.log("data", columns)
  return <div>
    <Link to="/">Back home</Link>
    <h3>{match.params.countryIso}</h3>
    <DataInput name="Forest area" columns={columns} valueChange={valueChange}/>
  </div>
}

const mapstateToProps = R.identity

const changedAction = ({name, value}) => ({
          type: 'CHANGED_VALUE',
          name, value
        })

const changedValue = ({name, value}) => {
  const dispatched = dispatch =>
    axios.post('/api/data', {name, value}).then(() => {
      dispatch(changedAction({name, value}))
    })
  dispatched.meta = {
    debounce: {
      time: 200,
      key: "CHANGED"
    }
  }
  return dispatched
}

const changeStart = ({name, value}) => ({type: 'CHANGE_START', name, value})

const valueChange = (name, value) => {
  const dispatched = dispatch => {
    dispatch(changeStart({name, value}))
    dispatch(changedValue({name, value}))
  }
  return dispatched
}

export default connect(mapstateToProps, {valueChange})(NationalDataEntry)
