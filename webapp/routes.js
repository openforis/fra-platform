import React from "react"

import Header from "./header/header"
import ErrorComponent from "./applicationError/errorComponent"
import Router from "./router/router"

// const routes = {
//   "/": Default
// }

export default ({path}) => {
  return <div className="app__root">
          <Header/>
          <ErrorComponent/>
          <div className="main__container">
            <Router path={path} />
              {/*<Route exact path="/" component={Default}/>*/}
              {/*<Route exact path="/login" component={Login}/>*/}
              {/*<Route exact path="/country/:countryIso" component={NationalDataEntry}/>*/}
              {/*<Route exact path="/country/odp/:countryIso" component={OriginalDataPoint}/>*/}
              {/*<Route exact path="/country/odp/:countryIso/:odpId" component={OriginalDataPoint}/>*/}
          </div>
      </div>
}

