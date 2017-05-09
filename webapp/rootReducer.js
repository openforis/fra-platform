import { combineReducers } from "redux"

import applicationError from "./applicationError/reducer"
import nationalDataEntry from "./nationalDataEntry/reducers"
import originalDataPoint from "./originalDataPoint/reducers"

export  default combineReducers( { applicationError, nationalDataEntry, originalDataPoint } )
