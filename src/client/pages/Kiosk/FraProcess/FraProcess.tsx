import 'client/pages/Kiosk/Kiosk.scss'
import React from 'react'

import { useLanguage } from 'client/hooks/language'
import Video from 'client/pages/Kiosk/components/Video'

const LANGUAGE_VIDEO_IDS: Record<string, string> = {
  en: 'SmMyfNlZ-jQ',
  fr: 'inJOU45yBbY',
  es: 'bNZNZdtuCOM',
}

const FraProcess: React.FC = () => {
  const lang = useLanguage()
  const videoId = LANGUAGE_VIDEO_IDS[lang] ?? LANGUAGE_VIDEO_IDS.en

  return <Video key={lang} videoId={videoId} />
}

export default FraProcess
