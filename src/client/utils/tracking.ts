import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { TrackId } from 'meta/tracking/id'

const GA_EVENT_NAME = 'homepage_clicks_test'
const SESSION_ID_KEY = 'analytics/sessionId'

type GaClickPageLocation = 'click' | 'navigation' | 'select'
type GaEvent = {
  clickFromLang: string
  cleanUrl: string
  clickPageLocation: GaClickPageLocation
  text: string
}

const getSessionId = (): string => {
  let sessionId = window.sessionStorage.getItem(SESSION_ID_KEY)
  if (!sessionId) {
    sessionId = window.crypto.randomUUID()
    window.sessionStorage.setItem(SESSION_ID_KEY, sessionId)
  }
  return sessionId
}

let pageEnteredAt = Date.now()

const getDurationMs = (): number => Date.now() - pageEnteredAt

const sendToGa = (props: GaEvent): void => {
  const { cleanUrl, clickFromLang, clickPageLocation, text } = props
  // @ts-ignore
  window.gtag?.('event', GA_EVENT_NAME, {
    click_page_location: clickPageLocation,
    clean_url: cleanUrl,
    click_from_lang: clickFromLang,
    text,
  })
}

const sendToBackend = async (eventType: string, payload: Record<string, unknown>): Promise<void> => {
  axios.post(ApiEndPoint.Analytics.event(), { sessionId: getSessionId(), eventType, payload }).catch()
}

const click = (props: { elementId: string; path: string }): void => {
  const { elementId, path } = props
  const durationMs = getDurationMs()
  sendToGa({ clickPageLocation: 'click', cleanUrl: path, clickFromLang: '', text: elementId })
  sendToBackend('click', { element_id: elementId, path, duration_ms: durationMs })
}

const select = (props: { elementId: TrackId; value: string }): void => {
  const { elementId, value } = props
  const durationMs = getDurationMs()
  sendToGa({ clickPageLocation: 'select', cleanUrl: '', clickFromLang: value, text: elementId })
  sendToBackend('select', { element_id: elementId, value, duration_ms: durationMs })
}

const navigation = (props: { fromPath: string; navType: string; toPath: string }): void => {
  const { fromPath, navType, toPath } = props
  const durationMs = getDurationMs()
  sendToGa({ clickPageLocation: 'navigation', cleanUrl: toPath, clickFromLang: navType, text: String(durationMs) })
  sendToBackend('navigation', { from_path: fromPath, to_path: toPath, duration_ms: durationMs, nav_type: navType })
  pageEnteredAt = Date.now()
}

export const Tracking = {
  click,
  navigation,
  select,
}
