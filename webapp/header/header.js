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

const annualItems = [
  {
    order: 1,
    label: "Extent of forest",
    path: "/country/:countryIso",
    status: "not started"
  },
  {
    order: 2,
    label: "Growing stock",
    status: "not started"
  },
  {
    order: 3,
    label: "Biomass stock",
    status: "not started"
  },
  {
    order: 4,
    label: "Carbon stock",
    status: "not started"
  },
  {
    order: 5,
    label: "Protected areas and long-term management plans",
    status: "not started"
  }
]

const fiveYeaItems = [
  {
    order: 6,
    label: "Forest area loss, gain and net change",
    status: "not started"
  },
  {
    order: 7,
    label: "Forest characteristics",
    status: "not started"
  },
  {
    order: 8,
    label: "Specific forest categories",
    status: "not started"
  },
  {
    order: 9,
    label: "Growing stock composition",
    status: "not started"
  },
  {
    order: 10,
    label: "Non wood forest products",
    status: "not started"
  },
  {
    order: 11,
    label: "Primary designated management objective",
    status: "not started"
  },
  {
    order: 12,
    label: "Forest ownership and management rights",
    status: "not started"
  },
  {
    order: 13,
    label: "Disturbances",
    status: "not started"
  },
  {
    order: 14,
    label: "Area affected by fire",
    status: "not started"
  },
  {
    order: 15,
    label: "Employment",
    status: "not started"
  },
  {
    order: 16,
    label: "Graduation of students",
    status: "not started"
  },
  {
    order: 17,
    label: "Policies and legislation",
    status: "not started"
  },
  {
    order: 18,
    label: "Area of permanent forest estate",
    status: "not started"
  }
]

const Nav = (path) => {
  console.log(path)
  return <div className={`main__header ${hideNav(path) ? 'hidden' : ''}`}>
    <CountryItem name="Italy" role="National Correspondent"/>
    <PrimaryItem label="Original Data" />
    <PrimaryItem label="Annually reported" link="send to review"/>
    {
      annualItems.map(v => <SecondaryItem {...v} />)
    }
    <PrimaryItem label="Five-year Cycle" link="send to review"/>
    {
      fiveYeaItems.map(v => <SecondaryItem {...v} />)
    }
  </div>
}

const mapStateToProps = state => {
  console.log("state", state)
  return R.pipe(R.path(["router"]), R.defaultTo({}))(state)
}

export default connect(mapStateToProps, {})(Nav)
