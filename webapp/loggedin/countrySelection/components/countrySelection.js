import React, { useEffect, useState } from 'react'
import * as R from 'ramda'

import Icon from '@webapp/components/icon'
import CountryList from '@webapp/loggedin/countrySelection/components/countryList'

class CountrySelection extends React.Component {

  constructor (props) {
    super(props)
    this.state = { isOpen: false }
    this.outsideClick = this.outsideClick.bind(this)
    window.addEventListener('click', this.outsideClick)
  }

  outsideClick (evt) {
    if (!this.refs.navCountryItem.contains(evt.target))
      this.setState({ isOpen: false })
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.outsideClick)
  }

  render () {
    const countryIso = this.props.name
    const { role, i18n, getCountryName } = this.props
    const { isOpen } = this.state

    const style = {
      backgroundImage: `url('/img/flags/1x1/${countryIso}.svg'), url('/img/flags/1x1/ATL.svg')`
    }

    return (
      <div className="nav__country" ref="navCountryItem" onClick={() => {
        this.setState({ isOpen: R.not(this.state.isOpen) })
      }}>
        <div className="nav__country-flag" style={style}></div>
        <div className="nav__country-info">
          <span className="nav__country-name">{getCountryName(countryIso, i18n.language)}</span>
          <span className="nav__country-role">{role}</span>
        </div>
        <Icon name="small-down"/>
        {
          isOpen &&
          <CountryList
            {...this.props}
            isOpen={this.state.isOpen}
            currentCountry={countryIso}
          />
        }
      </div>
    )
  }
}

export default CountrySelection

