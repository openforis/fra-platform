import './FraProcess.scss'
import 'client/pages/Kiosk/Kiosk.scss'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button, { ButtonType } from 'client/components/Buttons/Button'

import { useYouTubePlayer } from './hooks/useYouTubePlayer' // adjust import path

const LANGUAGE_VIDEO_IDS: Record<string, string> = {
  en: 'SmMyfNlZ-jQ',
  fr: 'inJOU45yBbY',
  es: 'bNZNZdtuCOM',
}

type FraProcessVideoProps = {
  videoId: string
}

const FraProcessVideo: React.FC<FraProcessVideoProps> = (props) => {
  const { videoId } = props
  const { player, ref } = useYouTubePlayer({ videoId })
  const [isEnded, setIsEnded] = useState(false)

  useEffect(() => {
    setIsEnded(false)
  }, [videoId])

  useEffect(() => {
    if (!player) return undefined
    const onStateChange = (event: YT.OnStateChangeEvent): void => {
      if (event.data === YT.PlayerState.ENDED) {
        setIsEnded(true)
      }
    }
    player.addEventListener('onStateChange', onStateChange)
    return () => {
      // player.removeEventListener might not be available if
      // the page is exited quickly
      if (player && player.removeEventListener) {
        player.removeEventListener('onStateChange', onStateChange)
      }
    }
  }, [player])

  const handleReplay = (): void => {
    if (player) {
      player.seekTo(0, false)
      player.playVideo()
      setIsEnded(false)
    }
  }

  return (
    <div className="kiosk-content__embedded-object kiosk-fra-process">
      <div ref={ref} className="kiosk-fra-process__yt-container" />
      {isEnded && (
        <div className="kiosk-fra-process__yt-video-overlay">
          <div className="kiosk-latest-activities__list-item-header">
            <Button
              className="kiosk-fra-process__yt-video-overlay-button"
              label="Replay video"
              onClick={handleReplay}
              type={ButtonType.primary}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const FraProcess: React.FC = () => {
  const { i18n } = useTranslation()
  const languageCode = i18n.resolvedLanguage ?? i18n.language
  const videoId = LANGUAGE_VIDEO_IDS[languageCode]

  return <FraProcessVideo key={videoId} videoId={videoId} />
}

export default FraProcess
