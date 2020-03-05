import React from 'react'
import Header from '@webapp/app/components/header/header'

const StatisticalFactsheets = () => {
  // TODO: from environmental var
  // URL_STATISTICAL_FACTSHEETS
  const src = 'https://app.powerbi.com/reportEmbed?reportId=b4d9e5d2-1926-4a3a-a575-3dc5023dfa0b&autoAuth=true&ctid=163ac468-abb8-44d0-81fd-d9db15e3af96&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWV1cm9wZS1ub3J0aC1iLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9'
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
      src={src}
      frameBorder="0"
      allowFullScreen={true}></iframe>
      </>

  )
}

export default StatisticalFactsheets
