import { MutableRefObject, useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
  }
}

const _loadYouTubeAPI = (() => {
  let isAPILoaded = false
  let ytAPIPromise: Promise<typeof YT>

  return (): Promise<typeof YT> => {
    if (isAPILoaded && window.YT) {
      return Promise.resolve(window.YT)
    }

    if (!ytAPIPromise) {
      ytAPIPromise = new Promise((resolve) => {
        window.onYouTubeIframeAPIReady = () => {
          isAPILoaded = true
          resolve(window.YT)
        }

        const script = document.createElement('script')
        script.src = 'https://www.youtube.com/iframe_api'
        script.async = true
        document.body.appendChild(script)
      })
    }
    return ytAPIPromise
  }
})()

type Props = {
  videoId: string
}

type Returned = {
  ref: MutableRefObject<HTMLDivElement>
  player: YT.Player | null
}

export const useYouTubePlayer = (props: Props): Returned => {
  const { videoId } = props
  const ref = useRef<HTMLDivElement | null>(null)
  const [player, setPlayer] = useState<YT.Player | null>(null)

  useEffect(() => {
    let ytPlayer: YT.Player | undefined

    _loadYouTubeAPI().then((YT) => {
      if (ref.current) {
        ytPlayer = new YT.Player(ref.current, {
          playerVars: {
            enablejsapi: 1,
            modestbranding: 1,
            rel: 0,
          },
          events: {},
          videoId,
        })
        setPlayer(ytPlayer)
      }
    })
  }, [videoId])
  return { player, ref }
}
