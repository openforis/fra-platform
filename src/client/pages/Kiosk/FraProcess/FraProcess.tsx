import 'client/pages/Kiosk/Kiosk.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Video from 'client/pages/Kiosk/components/Video'

const LANGUAGE_VIDEO_IDS: Record<string, string> = {
  en: 'SmMyfNlZ-jQ',
  fr: 'inJOU45yBbY',
  es: 'bNZNZdtuCOM',
}

const FraProcess: React.FC = () => {
  const { i18n } = useTranslation()
  const languageCode = i18n.resolvedLanguage ?? i18n.language
  const videoId = LANGUAGE_VIDEO_IDS[languageCode] ?? LANGUAGE_VIDEO_IDS.en

  return <Video key={i18n.language} videoId={videoId} />
}

export default FraProcess
