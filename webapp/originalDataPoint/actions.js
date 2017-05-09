import { applicationError } from "../applicationError/actions"
import axios from "axios"

export const dataPointSaveDraftStart     = 'originalDataPoint/saveDraft/start'
export const dataPointSaveDraftCompleted = 'originalDataPoint/saveDraft/completed'

export const saveDraft = ( countryIso, obj ) => dispatch => {
    dispatch( startSavingDraft( obj ) )
    dispatch( persistDraft( countryIso, obj ) )
}

const startSavingDraft = ( obj ) => ({ type: dataPointSaveDraftStart, active: obj })

const persistDraft = ( countryIso, obj ) => {
    const dispatched = dispatch =>
        axios.post( `/api/country/originalDataPoint/draft/${countryIso}`, obj ).then( () => {
            dispatch( saveDraftCompleted() )
        } ).catch( ( err ) => {
            dispatch( applicationError( err ) )
        } )
    
    dispatched.meta = {
        debounce: {
            time: 800,
            key : "ODP-CHANGED"
        }
    }
    return dispatched
}

const saveDraftCompleted = () => ({ type: dataPointSaveDraftCompleted })