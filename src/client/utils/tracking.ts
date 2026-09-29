import { TrackId } from 'meta/tracking/id'

// We use custom event to track actions in the platform
// event name: homepage_clicks_test
// event properties: clickFromLang, cleanUrl, clickPageLocation, text

const GA_EVENT_NAME = 'homepage_clicks_test'

type ClickPageLocation = 'click' | 'navigation' | 'select'

type Event = {
  clickFromLang: string
  cleanUrl: string
  clickPageLocation: ClickPageLocation
  text: string
}

const sendEvent = (props: Event): void => {
  const { cleanUrl, clickFromLang, clickPageLocation, text } = props
  // @ts-ignore
  window.gtag?.('event', GA_EVENT_NAME, {
    click_page_location: clickPageLocation,
    clean_url: cleanUrl,
    click_from_lang: clickFromLang,
    text,
  })
}

const click = (props: { elementId: string; path: string }): void => {
  const { elementId, path } = props
  sendEvent({ clickPageLocation: 'click', cleanUrl: path, clickFromLang: '', text: elementId })
}

const select = (props: { elementId: TrackId; value: string }): void => {
  const { elementId, value } = props
  sendEvent({ clickPageLocation: 'select', cleanUrl: '', clickFromLang: value, text: elementId })
}

const navigation = (props: { durationMs: number; navType: string; toPath: string }): void => {
  const { durationMs, navType, toPath } = props
  sendEvent({ clickPageLocation: 'navigation', cleanUrl: toPath, clickFromLang: navType, text: String(durationMs) })
}

export const Tracking = {
  click,
  navigation,
  select,
}
