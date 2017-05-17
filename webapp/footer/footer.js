import React from "react"
import { connect } from "react-redux"

const Footer = ({status}) => console.log(status) || <div>
        {status}
    </div>

const mapStateToProps = state => state.autoSave

export default connect(mapStateToProps)( Footer )
