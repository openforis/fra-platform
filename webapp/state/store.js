import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createDebounce from 'redux-debounced'
import reducer from './rootReducer'

const composeEnhancers =
    process.env.NODE_ENV === 'development' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose

const middleware = [createDebounce(), thunkMiddleware]
const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
)

const store = createStore(reducer, enhancer)

export default store
