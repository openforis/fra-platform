import { useEffect } from 'react'

import { Tracking } from 'client/utils/tracking'

export const useClickTracking = (): void => {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const target = (event.target as HTMLElement).closest('[data-track-id]')
      if (!target) return

      const elementId = target.getAttribute('data-track-id') ?? ''
      Tracking.click({ elementId, path: window.location.pathname })
    }

    document.addEventListener('click', handleClick, true)

    return (): void => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])
}
