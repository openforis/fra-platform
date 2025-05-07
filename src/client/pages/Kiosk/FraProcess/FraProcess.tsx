import './FraProcess.scss'
import 'client/pages/Kiosk/Kiosk.scss'
import React, { useEffect, useState } from 'react'

import Button, { ButtonType } from 'client/components/Buttons/Button'

import { useYouTubePlayer } from './hooks/useYouTubePlayer' // adjust import path

const FRA_PROCESS_VIDEO_ID = 'SmMyfNlZ-jQ'

const FraProcess: React.FC = () => {
  const { player, ref } = useYouTubePlayer({ videoId: FRA_PROCESS_VIDEO_ID })
  const [isEnded, setIsEnded] = useState(false)

  useEffect(() => {
    if (!player) return undefined
    const onStateChange = (event: YT.OnStateChangeEvent) => {
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

  const handleReplay = () => {
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

export default FraProcess
