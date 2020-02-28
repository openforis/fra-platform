import * as R from 'ramda'
import * as AppState from '@webapp/app/appState'

export const stateKey = 'navigation'

const keys = {
  visible: 'visible'
}

const getState = R.prop(stateKey)

const _getVisible = R.propOr(true, keys.visible)

export const isVisible = state => {
  const countryIso = AppState.getCountryIso(state)
  return countryIso && R.pipe(getState, _getVisible)(state)
}

export const toggleVisible = state => R.assoc(keys.visible, !_getVisible(state))(state)

