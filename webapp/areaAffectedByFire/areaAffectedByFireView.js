import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import CommentableDescriptions from '../description/commentableDescription'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'

const AreaAffectedByFire = ({match, i18n}) => {
  const tableProps = tableSpec(i18n)

  return <LoggedInPageTemplate>
    <div className="tv__container aabf__container">
      <h2 className="headline tv__page-header">{i18n.t('areaAffectedByFire.areaAffectedByFire')}</h2>
      <TraditionalTable tableSpec={tableProps} countryIso={match.params.countryIso}/>
      <CommentableDescriptions
        section={tableProps.name}
        name="areaAffectedByFire"
        countryIso={match.params.countryIso}
        i18n={i18n}
      />
    </div>
  </LoggedInPageTemplate>
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(AreaAffectedByFire)
