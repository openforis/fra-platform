import React from 'react'
import { connect } from 'react-redux'

const links = [
  {href: 'http://unfccc.int/parties_observers/parties/national_focal_points/items/9336.php', key: 'unfcccFocalPoints'},
  {href: '/api/landing/sdgFocalPoints', key: 'sdgFocalPoints'},
  {href: 'http://www.slms4redd.org', key: 'reddPortal'},
  {href: 'https://goo.gl/aYJmzd', key: 'fraGeoSpatialTools'}
]

const LinksView = ({i18n}) => <div className="landing__links-container">
  {
    links.map(link =>
      <div key={link.key} className="landing__link-container">
        <a href={link.href} target="_blank">{i18n.t(`landing.links.${link.key}`)}</a>
      </div>
    )
  }
</div>

const mapStateToProps = state => ({
  i18n: state.user.i18n,
})

export default connect(mapStateToProps)(LinksView)
