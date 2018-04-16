import React from 'react'
import { connect } from 'react-redux'

import Icon from '../../reusableUiComponents/icon'

const links = [
  {href: 'http://unfccc.int/parties_observers/parties/national_focal_points/items/9336.php', key: 'unfcccFocalPoints'},
  {href: '/api/landing/sdgFocalPoints', key: 'sdgFocalPoints'},
  {href: 'http://www.slms4redd.org', key: 'reddPortal'},
  {href: 'https://goo.gl/aYJmzd', key: 'fraGeoSpatialTools'}
]

const LinksView = ({i18n}) => <div className="landing__links-container">
  <div className="landing__page-container-header">
    <h3>{i18n.t('landing.links.links')}</h3>
  </div>
  {
    links.map(link =>
      <div key={link.key} className="landing__link-container">
        <a href={link.href} target="_blank">{i18n.t(`landing.links.${link.key}`)}</a>
      </div>
    )
  }

  <div className="landing__repository-header">
    <h3>{i18n.t('landing.links.repository')}</h3>
    <button className="btn-s btn-primary">
      <Icon className="icon-sub icon-white" name="hit-up"/>
      {i18n.t('landing.links.uploadFile')}
    </button>
  </div>
</div>

const mapStateToProps = state => ({
  i18n: state.user.i18n,
})

export default connect(mapStateToProps)(LinksView)
