import * as R from "ramda"
import React from "react"
import Route from "route-parser"
import { connect } from "react-redux"

import {follow} from "./actions"
import Notfound from "../notfound"

class Router extends React.Component {

  componentWillMount() {
    const routes = this.props.routes

    window.onhashchange = () => {
      console.log("hash chganged", location.hash)
      this.props.follow(location.hash)
    }
  }


  render()
  {
    console.log("router props", this.props)
    const route = R.find(route => route.route.match(this.props.path))(this.props.routes)
    return route ? React.createElement(route.component, {match: {params: route.route.match(this.props.path)}}) : <Notfound/>
  }
}


const mapStateToProps = state => {
  return state.router.path ? {path: state.router.path} : {path: window.location.hash}
}

export default connect(mapStateToProps, {follow})(Router)
