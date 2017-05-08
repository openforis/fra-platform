import {combineReducers} from "redux"

import nationalDataEntry from "./nationalDataEntry/reducers"
import applicationError from "./applicationError/reducer"

export  default combineReducers({nationalDataEntry, applicationError})
