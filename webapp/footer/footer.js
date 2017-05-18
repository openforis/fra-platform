import "./style.less"

import React from "react"
import { connect } from "react-redux"

const Footer = ({status}) => <div className="footer__container">
        <span className="footer__autosave-status">{status}</span>
    </div>

const mapStateToProps = state => state.autoSave

export default connect(mapStateToProps)( Footer )
