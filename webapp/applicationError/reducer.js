import {applicationErrorType} from './actions'

export default (state={}, action) => {
    if (action.type === applicationErrorType) {
        return {...state, msg: action.error + ''}
    }
    return state
}
