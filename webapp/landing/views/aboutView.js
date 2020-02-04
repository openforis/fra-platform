import React from 'react'
import { connect } from 'react-redux'

import * as UserState from '@webapp/user/userState'

const Logos = ({ i18n }) => <div className="landing__logos-container">
  <div className="landing__logos-inner-container">
    <img src="/img/cfrq_logos.png" className="landing__logos"/>
  </div>
  <div className="landing__logos-inner-container">
    <div style={{ paddingRight: '14px' }}>{i18n.t('landing.overview.withFinancialSupportOf')}</div>
    <img src="/img/ec_logo.png" height="50"/>
    <img src="/img/nicfi_3.jpg" className="landing__logos landing__logos__nicfi"/>
    <img src="/img/mfafi_logo.png" height="80"/>
    <img src="/img/mmmfi_logo.png" height="50"/>
  </div>
</div>

const AboutView = ({ i18n }) => <div className="landing__page-container">

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
      {i18n.t('landing.about.email')}: <a href="mailto:Anssi.Pekkarinen@Fao.org">Anssi.Pekkarinen@Fao.org</a>
    </p>
    <p>{i18n.t('landing.about.or')}</p>
    <p>
      <a href="mailto:FRA@Fao.org">FRA@Fao.org</a>
    </p>
  </div>

  <Logos i18n={i18n}/>

  <div className="landing__version">{i18n.t('navigation.support.platformVersion')} {__PLATFORM_VERSION__}</div>
</div>

const mapStateToProps = state => ({
  i18n: UserState.getI18n(state),
})

export default connect(mapStateToProps)(AboutView)
