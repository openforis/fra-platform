import React from 'react'
import { connect } from 'react-redux'

const AboutView = ({i18n}) => <div>
  <div className="landing__page-container">

    <div className="landing__page-container-item">
      <div className="landing__about-text">{i18n.t('landing.about.fraProcess')}</div>
      <a href="http://www.fao.org/forest-resources-assessment/en/" target="_blank" className="link">
        {i18n.t('landing.about.linkFraProcess')}
      </a>
    </div>

    <div className="landing__page-container-item landing__block">
      <h3 className="subhead landing__block-heading">{i18n.t('landing.about.contact')}</h3>
      <p>
        Anssi Pekkarinen<br/>
        {i18n.t('landing.about.seniorForestryOfficer')}<br/>
        {i18n.t('landing.about.faoForestryDepartment')}<br/>
        Viale delle Terme di Caracalla<br/>
        Rome 00153, Italy<br/>
        {i18n.t('landing.about.email')}: Anssi.Pekkarinen@Fao.org
      </p>
      <p>{i18n.t('landing.about.or')}</p>
      <p>
        FRA@Fao.org<br/>
      </p>
    </div>

  </div>
  <div className="landing__page-container">
    <div className="landing__version">{i18n.t('navigation.support.platformVersion')} {__PLATFORM_VERSION__}</div>
  </div>
</div>

const mapStateToProps = state => ({
  i18n: state.user.i18n,
})

export default connect(mapStateToProps)(AboutView)
