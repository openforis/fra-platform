import './Video.scss'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button, { ButtonType } from 'client/components/Buttons/Button'

import { useYouTubePlayer } from './hooks/useYouTubePlayer'

type Props = {
  videoId: string
}

const Video: React.FC<Props> = (props) => {
  const { videoId } = props
  const { t } = useTranslation()
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
      if (player.removeEventListener) {
        player.removeEventListener('onStateChange', onStateChange)
      }
    }
  }, [player])

  const handleReplay = (): void => {
    if (!player) return
    player.seekTo(0, false)
    player.playVideo()
    setIsEnded(false)
  }

  return (
    <div className="kiosk-content__embedded-object kiosk-video">
      <div ref={ref} className="kiosk-video__player" />
      {isEnded && (
        <div className="kiosk-video__overlay">
          <div className="kiosk-latest-activities__list-item-header">
            <Button
              className="kiosk-video__overlay-button"
              label={t('kiosk.replayVideo')}
              onClick={handleReplay}
              type={ButtonType.primary}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Video
