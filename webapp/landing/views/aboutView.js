import React from 'react'
import { connect } from 'react-redux'

class AboutView extends React.Component {

  render () {
    const {i18n} = this.props

    return <div className="landing__page-container">

      <div className="landing__page-container-item">
        <div className="landing__about-text">{i18n.t('dashboard.fraProcess')}</div>
        <a href="http://www.fao.org/forest-resources-assessment/en/" target="_blank" className="link">
          {i18n.t('dashboard.linkFraProcess')}
          </a>
      </div>

      <div className="landing__page-container-item landing__block">
        <h3 className="subhead landing__block-heading">{i18n.t('landing.about.contact')}</h3>
        <p>
          Firstname Lastname<br/>
          firstname.lastname@fao.org<br/>
          +358 40 123 4567
        </p>
        <p>
          Firstname Lastname<br/>
          firstname.lastname@fao.org<br/>
          +358 40 123 4567
        </p>
      </div>

    </div>
  }
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
})

export default connect(mapStateToProps)(AboutView)
