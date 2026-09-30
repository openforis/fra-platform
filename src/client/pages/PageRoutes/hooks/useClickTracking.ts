import { useEffect } from 'react'

const GA_EVENT_NAME = 'app_click'

export const useClickTracking = (): void => {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const target = (event.target as HTMLElement).closest('[data-track-id]')
      if (!target) return

      const elementId = target.getAttribute('data-track-id')
      // gtag is defined in index.html only for prod
      // @ts-ignore
      window.gtag?.('event', GA_EVENT_NAME, {
        element_id: elementId,
        path: window.location.pathname,
      })
    }

    document.addEventListener('click', handleClick, true)

    return (): void => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])
}
