import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import { Link } from './../link'

import './style.less'

const CountryItem = ({name, role}) =>
  <div className="country__item">
    <div className="country__flag"></div>
    <div className="country__info">
      <span className="country__name">{name}</span>
      <span className="country__nc">{role}</span>
    </div>
  </div>

const PrimaryItem = ({label, link}) =>
  <div className="primary__item">
    <span className="primary__label">{label}</span>
    <Link className="primary__link" to="/">{link}</Link>
  </div>

const SecondaryItem = ({order, label, status}) =>
  <div className="secondary__item">
    <span className="order">{order}</span>
    <div>
      <span className="label">{label}</span>
      <span className="status">{status}</span>
    </div>
  </div>

const hideNav = path => !path || R.equals("/", path) || R.equals("#/", path)

const Nav = ({path}) => {

  return <div className={`main__header ${hideNav(path) ? 'hidden' : ''}`}>
    <CountryItem name="Italy" role="National Correspondent"/>
    <PrimaryItem label="Original Data" link="send to review"/>
    <SecondaryItem order="1" label="Extent of Forest" status="not started"/>
  </div>
}

const mapStateToProps = state => {
  console.log("state", state)
  return R.pipe(R.path(["router"]), R.defaultTo({}))(state)
}

export default connect(mapStateToProps, {})(Nav)
