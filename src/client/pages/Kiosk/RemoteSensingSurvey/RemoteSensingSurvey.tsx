import 'client/pages/Kiosk/Kiosk.scss'
import React from 'react'

import Video from 'client/pages/Kiosk/components/Video'

const REMOTE_SENSING_VIDEO_ID = 'gK1p3w1E-4Y'

const RemoteSensingSurvey: React.FC = () => {
  return <Video videoId={REMOTE_SENSING_VIDEO_ID} />
}

export default RemoteSensingSurvey
