import { useEffect } from 'react'

import { Tracking } from 'client/utils/tracking'

const EVENT_NAME = 'app_click'

export const useClickTracking = (): void => {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const target = (event.target as HTMLElement).closest('[data-track-id]')
      if (!target) return

      const elementId = target.getAttribute('data-track-id')
      Tracking.capture(EVENT_NAME, { element_id: elementId, path: window.location.pathname })
    }

    document.addEventListener('click', handleClick, true)

    return (): void => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])
}
