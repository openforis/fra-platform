import { applicationError } from "../applicationError/actions"
import axios from "axios"

export const dataPointSaveDraftStart     = 'originalDataPoint/saveDraft/start'
export const dataPointSaveDraftCompleted = 'originalDataPoint/saveDraft/completed'

export const saveDraft = ( countryIso, obj ) => dispatch => {
    dispatch( startSavingDraft( obj ) )
    dispatch( persistDraft( countryIso, obj ) )
}

const startSavingDraft = ( obj ) => ({ type: dataPointSaveDraftStart, active: obj })

const persistDraft = (countryIso, obj) => {
    const dispatched = dispatch =>
        axios.post( `/api/country/originalDataPoint/draft/${countryIso}`, obj ).then((resp) => {
            dispatch( saveDraftCompleted(resp.data.odpId) )
        } ).catch( ( err ) => {
            dispatch( applicationError( err ) )
        } )
    
    dispatched.meta = {
        debounce: {
            time: 800,
            key : dataPointSaveDraftStart
        }
    }
    return dispatched
}

const saveDraftCompleted = odpId => ({ type: dataPointSaveDraftCompleted, odpId })