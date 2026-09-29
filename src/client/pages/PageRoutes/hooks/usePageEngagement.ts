import { useEffect } from 'react'
import { createBrowserRouter } from 'react-router'

import { Tracking } from 'client/utils/tracking'

const EXIT_MARKER = '(exit)'

type Router = ReturnType<typeof createBrowserRouter>

export const usePageEngagement = (router: Router): void => {
  useEffect(() => {
    let currentPath = window.location.pathname
    let exitSent = false

    const sendPageNavigationEvent = (toPath: string, navType: string): void => {
      Tracking.navigation({ fromPath: currentPath, navType, toPath })
    }

    const unsubscribeRouter = router.subscribe((state) => {
      const { pathname } = state.location
      if (pathname === currentPath) return

      // redirects (e.g. /country -> /country/home) fire as REPLACE, not real navigation
      const isRealNavigation = state.historyAction !== 'REPLACE'
      if (isRealNavigation) {
        // PUSH: an in-app link/select click
        // POP: browser back/forward
        sendPageNavigationEvent(pathname, state.historyAction.toLowerCase())
        exitSent = false
      }

      currentPath = pathname
    })

    const handleVisibilityChange = (): void => {
      if (document.visibilityState !== 'hidden' || exitSent) return
      exitSent = true
      sendPageNavigationEvent(EXIT_MARKER, 'exit')
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return (): void => {
      unsubscribeRouter()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [router])
}
