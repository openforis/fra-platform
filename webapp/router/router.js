import React from "react"
import { connect } from "react-redux"

import Default from "../default"

import {follow} from "./actions"

class Router extends React.Component {

  componentWillMount() {
    window.onhashchange = () => {
      console.log("hash chganged", location.hash)
      this.props.follow(location.hash)
    }
  }

  render()
  {
    console.log("router props", this.props)
    return <Default/>
  }
}


const mapStateToProps = state => {
  return state.router.path ? {path: state.router.path} : {path: "non "}
}

export default connect(mapStateToProps, {follow})(Router)
