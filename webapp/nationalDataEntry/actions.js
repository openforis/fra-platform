import axios from "axios"
import * as R from "ramda"

export const valueChangeStart = 'nationalDataEntry/value/change/start'
export const valueChangeCompleted = 'nationalDataEntry/value/change/completed'

const changed = ({name, value}) => ({
  type: valueChangeCompleted,
  name, value
})

const change = ({name, value, data}) => {
  const dispatched = dispatch =>
    axios.post('/api/data', R.assocPath([name, "value"], value, data)).then(() => {
      dispatch(changed({name, value}))
    })
  dispatched.meta = {
    debounce: {
      time: 800,
      key: "CHANGED"
    }
  }
  return dispatched
}

const start = ({name, value}) => ({type: valueChangeStart, name, value})

export const save = (name, value, data) => dispatch => {
    dispatch(start({name, value}))
    dispatch(change({name, value, data}))
}

