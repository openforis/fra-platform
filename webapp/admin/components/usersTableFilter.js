import './usersTableFilter.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import camelize from 'camelize'
import snake from 'to-snake-case'

import MultiSelect from '../../reusableUiComponents/multiSelect'

import {
  alternateNationalCorrespondent,
  nationalCorrespondent,
  collaborator,
  reviewer,
  administrator
} from '../../../common/countryRole'

const roleToValue = role => camelize(role.toLowerCase())
const valueToRole = value => snake(value).toUpperCase()

const roles = [
  roleToValue(reviewer.role),
  roleToValue(nationalCorrespondent.role),
  roleToValue(alternateNationalCorrespondent.role),
  roleToValue(collaborator.role),
  roleToValue(administrator.role)
]

const languages = ['en', 'es', 'fr', 'ru']

class UsersTableFilter extends React.Component {

  render () {

    const {i18n, filter, onChange, countries} = this.props
    const countryISOs = countries.map(R.prop('countryIso'))

    return <div className="users__table-filter">

      <div className="users__table-filter-title">
        <h3>{i18n.t('admin.filter')}</h3>
      </div>

      <div className="users__table-filter-container">

        {/*<div className="users__table-filter-item">*/}
          {/*<div className="users__table-filter-item-label">*/}
            {/*<h4>{i18n.t('admin.language')}</h4>*/}
          {/*</div>*/}
          {/*<div>*/}
            {/*<MultiSelect*/}
              {/*i18n={i18n}*/}
              {/*localizationPrefix="language"*/}
              {/*values={filter.langs}*/}
              {/*options={languages}*/}
              {/*onChange={values => onChange(R.assoc('langs', values, filter))}*/}
            {/*/>*/}
          {/*</div>*/}
        {/*</div>*/}

        <div className="users__table-filter-item">
          <div className="users__table-filter-item-label">
            <h4>{i18n.t('userManagement.role')}</h4>
          </div>
          <div>
            <MultiSelect
              i18n={i18n}
              localizationPrefix="user.roles"
              values={filter.roles.map(roleToValue)}
              options={roles}
              onChange={values => onChange(R.assoc('roles', values.map(valueToRole), filter))}
            />
          </div>
        </div>

        {/*<div className="users__table-filter-item">*/}
          {/*<div className="users__table-filter-item-label">*/}
            {/*<h4>{i18n.t('admin.country')}</h4>*/}
          {/*</div>*/}
          {/*<div className="multi-select">*/}
            {/*<div className="multi-select__closed-content"></div>*/}
          {/*</div>*/}
        {/*</div>*/}

            {/*<MultiSelect*/}
              {/*i18n={i18n}*/}
              {/*localizationPrefix="user.roles"*/}
              {/*values={filter.countries}*/}
              {/*options={countryISOs}*/}
              {/*onChange={values => onChange(R.assoc('countries', values, filter))}*/}
            {/*/>*/}
      </div>


    </div>
  }

}

const mapStateToProps = state => ({
  countries: R.path(['country', 'countries', administrator.role], state)
})

export default connect(mapStateToProps)(UsersTableFilter)
