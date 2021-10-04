import { useReducer } from 'react'

import useIsMounted from './useIsMounted'

const useAsyncActionHandlers = [
  (data: any) => ({
    ...data,
    loading: true,
    loaded: false,
  }),
  (data: any) => ({
    ...data,
    loading: false,
    loaded: true,
  }),
  (error: any) => ({
    error,
    loading: false,
    loaded: false,
  }),
]

export default (promiseFn: any, promiseArgs: any) => {
  const [state, _dispatch] = useReducer(
    (_state: any, { type, payload }: any) => useAsyncActionHandlers[type](payload),
    {
      loading: false,
      loaded: false,
    }
  )
  const isMounted = useIsMounted()

  const dispatch = () => {
    ;(async () => {
      _dispatch({ type: 0, payload: state })

      try {
        const payload = await promiseFn(...promiseArgs)
        if (isMounted.current) {
          _dispatch({ type: 1, payload })
        }
      } catch (error) {
        _dispatch({ type: 2, payload: error })
      }
    })()
  }

  const setState = (stateUpdate: any) => {
    _dispatch({ type: 1, payload: stateUpdate })
  }

  return {
    ...state,
    dispatch,
    setState,
  }
}
