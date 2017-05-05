import axios from "axios"

export const valueChangeStart = 'nationalDataEntry/value/change/start'
export const valueChangeCompleted = 'nationalDataEntry/value/change/completed'

const changed = ({name, value}) => ({
  type: valueChangeCompleted,
  name, value
})

const change = ({name, value}) => {
  const dispatched = dispatch =>
    axios.post('/api/data', {name, value}).then(() => {
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

export const save = (name, value) => dispatch => {
    dispatch(start({name, value}))
    dispatch(change({name, value}))
}

