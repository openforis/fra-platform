import React from 'react'
import Header from '@webapp/app/components/header/header'

const StatisticalFactsheets = () => {
  // TODO: from environmental var
  // URL_STATISTICAL_FACTSHEETS
  const style = { 
    overflow:'hidden',
    width:"100%",
    height:"100vh",
  }

  return (
    <>
    <Header hideNavigationControl hideLinks />
    <iframe
      width="100%"
      height="100%"
      style={ style }
      src={__URL_STATISTICAL_FACTSHEETS__}
      frameBorder="0"
      allowFullScreen={true}></iframe>
      </>

  )
}

export default StatisticalFactsheets
