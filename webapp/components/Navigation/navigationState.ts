import * as R from 'ramda'

export const stateKey = 'navigation'

const keys = {
  visible: 'visible',
}

const getState = R.prop(stateKey)

const _getVisible = R.prop(keys.visible)

export const isVisible = R.pipe(getState, _getVisible)

export const toggleVisible = (state: any) => R.assoc(keys.visible, !_getVisible(state))(state)
