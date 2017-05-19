import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import Route from 'route-parser'
import countries from 'i18n-iso-countries'

import { Link } from './../link'
import { follow } from './../router/actions'

import './style.less'

const CountryItem = ({name, role}) => {
  const style = {
    content: `url('/img/flags/${countries.alpha3ToAlpha2(name)}.svg'`
  }
  return <div className="country__item">
    <div className="country__flag" style={style}></div>
    <div className="country__info">
      <span className="country__name">{name}</span>
      <span className="country__nc">{role}</span>
    </div>
  </div>
}

const PrimaryItem = ({label, link}) =>
  <div className="primary__item">
    <span className="primary__label">{label}</span>
    <Link className="primary__link" to="/">{link}</Link>
  </div>

const SecondaryItem = ({path, countryIso, order, pathTemplate = "#/tbd", label, status, goTo}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})

  return <div className={`secondary__item ${R.equals(path, linkTo) ? 'selected' : ''}`}
              onClick={e => goTo(linkTo)}>
    <span className="order">{order}</span>
    <div>
      <span className="label">{label}</span>
      <span className="status">{status}</span>
    </div>
  </div>
}

const hideNav = path => !path || R.equals("/", path) || R.equals("#/", path)

const annualItems = [
  {
    order: 1,
    label: "Extent of forest",
    pathTemplate: "#/country/:countryIso",
    status: "not started"
  },
  {
    order: 2,
    label: "Growing stock",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 3,
    label: "Biomass stock",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 4,
    label: "Carbon stock",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 5,
    label: "Protected areas and long-term management plans",
    pathTemplate: "#/todo",
    status: "not started"
  }
]
const fiveYeaItems = [
  {
    order: 6,
    label: "Forest area loss, gain and net change",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 7,
    label: "Forest characteristics",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 8,
    label: "Specific forest categories",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 9,
    label: "Growing stock composition",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 10,
    label: "Non wood forest products",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 11,
    label: "Primary designated management objective",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 12,
    label: "Forest ownership and management rights",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 13,
    label: "Disturbances",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 14,
    label: "Area affected by fire",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 15,
    label: "Employment",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 16,
    label: "Graduation of students",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 17,
    label: "Policies and legislation",
    pathTemplate: "#/todo",
    status: "not started"
  },
  {
    order: 18,
    label: "Area of permanent forest estate",
    pathTemplate: "#/todo",
    status: "not started"
  }
]

const Nav = ({path, country, follow}) => {
  return <div className={`main__header ${hideNav(path) ? 'hidden' : ''}`}>
    <CountryItem name={country} role="National Correspondent"/>
    <PrimaryItem label="Original Data" />
    <PrimaryItem label="Annually reported" link="send to review"/>
    {
      annualItems.map(v => <SecondaryItem path={path} goTo={follow} countryIso={country} {...v} />)
    }
    <PrimaryItem label="Five-year Cycle" link="send to review"/>
    {
      fiveYeaItems.map(v => <SecondaryItem {...v} />)
    }
  </div>
}

const mapStateToProps = state => {
  return R.pipe(R.path(["router"]), R.defaultTo({}))(state)
}

export default connect(mapStateToProps, {follow})(Nav)
