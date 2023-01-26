import type { TypedAddListener, TypedStartListening } from '@reduxjs/toolkit'
import { addListener, createListenerMiddleware } from '@reduxjs/toolkit'

import type { RootState } from '../RootState'
import type { AppDispatch } from '../store'

export const listenerMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening = listenerMiddleware.startListening as AppStartListening

export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>

// Example listener for navigating or verifying user login
// https://redux-toolkit.js.org/api/createListenerMiddleware
//
// export const useLoginListener = () => {
//   const navigate = useNavigate()
//   const dispatch = useAppDispatch()
//   useEffect(() => {
//     // Could also just `return dispatch(addListener())` directly, but showing this
//     // as a separate variable to be clear on what's happening
//     const unsubscribe = dispatch(
//       addAppListener({
//         matcher: isAnyOf(LoginActions.localLogin.fulfilled, LoginActions.acceptInvitation.fulfilled),
//         effect: (action, listenerApi) => {
//           console.log({
//             state: listenerApi.getState(), // previous state
//             action,
//             navigate,
//           })
//           navigate('/verify-user-login/')
//         },
//       })
//     )
//     return unsubscribe
//   }, [dispatch, navigate])
// }
