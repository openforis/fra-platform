import "./style.less"

import React from "react"
import { Link } from "react-router-dom"

export default () => <div className="main__header">
    <img src="/img/FAO_logo.png" height="48"/>
    <Link to="/">FRA Platform</Link>
</div>