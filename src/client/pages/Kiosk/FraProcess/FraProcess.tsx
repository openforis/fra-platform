import React from 'react'

const FRA_PROCESS_VIDEO_ID = 'SmMyfNlZ-jQ'

const FraProcess: React.FC = () => {
  return (
    <object
      aria-label="FRA process video"
      className="kiosk-content__embedded-object"
      data={`https://www.youtube.com/embed/${FRA_PROCESS_VIDEO_ID}`}
      type="video/mp4"
    />
  )
}

export default FraProcess
