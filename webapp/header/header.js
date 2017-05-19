import "./style.less"
import React from "react"
import { Link } from "./../link"

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

export default () => <div className="main__header">
  <CountryItem name="Italy" role="National Correspondent" />

  <PrimaryItem label="Original Data" link="send to review" />

  <SecondaryItem order="1" label="Extent of Forest" status="not started" />



</div>