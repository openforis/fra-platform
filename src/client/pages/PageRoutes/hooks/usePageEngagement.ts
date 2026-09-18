import { useEffect } from 'react'
import { createBrowserRouter } from 'react-router'

const GA_EVENT_NAME = 'page_navigation'
const EXIT_MARKER = '(exit)'

type Router = ReturnType<typeof createBrowserRouter>

export const usePageEngagement = (router: Router): void => {
  useEffect(() => {
    let currentPath = window.location.pathname
    let enteredAt = Date.now()
    let exitSent = false

    const sendPageNavigationEvent = (toPath: string): void => {
      // gtag is defined in index.html only for prod
      // @ts-ignore
      window.gtag?.('event', GA_EVENT_NAME, {
        from_path: currentPath,
        to_path: toPath,
        duration_ms: Date.now() - enteredAt,
      })
    }

    const unsubscribeRouter = router.subscribe((state) => {
      const { pathname } = state.location
      if (pathname === currentPath) return

      // redirects (e.g. /country -> /country/home) fire as REPLACE, not real navigation
      const isRealNavigation = state.historyAction !== 'REPLACE'
      if (isRealNavigation) {
        sendPageNavigationEvent(pathname)
        enteredAt = Date.now()
        exitSent = false
      }

      currentPath = pathname
    })

    const handleVisibilityChange = (): void => {
      if (document.visibilityState !== 'hidden' || exitSent) return
      exitSent = true
      sendPageNavigationEvent(EXIT_MARKER)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return (): void => {
      unsubscribeRouter()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [router])
}
