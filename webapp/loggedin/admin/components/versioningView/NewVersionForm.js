import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { format } from 'date-fns'

import * as AppState from '@webapp/app/appState'
import * as AdminState from '@webapp/loggedin/admin/adminState'

import { validField, versionIsGreater } from './versioningViewUtils'

const DateInput = (props) => {
  const { onChange } = props

  const minDate = format(new Date(),
    'yyyy-MM-ddThh:mm', { awareOfUnicodeTokens: true });
  const maxDate = format(new Date(new Date().getUTCFullYear() + 2 + ''),
    'yyyy-MM-ddThh:mm', { awareOfUnicodeTokens: true });

  return <input
    className="new-version__input"
    min={minDate}
    max={maxDate}
    onChange={onChange}
    type="datetime-local"
    name="publishedAt" />
}

const VersionInput = (props) => {
  const { onChange } = props
  return <input
    className="new-version__input"
    onChange={onChange}
    placeholder="Ex. 1.0.0"
    type="text"
    name="versionNumber" />
}

export const NewVersionForm = (props) => {
  const { onSubmit, onChange, i18n } = props;
  const [error, setError] = useState(null)
  const countryIso = useSelector(AppState.getCountryIso)
  const versions = useSelector(AdminState.getVersions) || {}
  const newVersionForm = useSelector(AdminState.getNewVersionForm) || {}
  const history = useHistory();

  const goBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const onFormSubmit = (e) => {
    // Prevent <form> element doing page refresh on submit
    e.preventDefault();
    if (!(
      validField(newVersionForm, 'versionNumber') &&
      validField(newVersionForm, 'date') &&
      versionIsGreater(versions, newVersionForm.versionNumber)
    )) {
      setError(true)
      return
    }

    onSubmit()
    const url = `/country/${countryIso}/admin/versioning/`;
    history.push(url)
  }

  return <div className="new-version__container">
    {
      error &&
      <div className="new-version__error-container">
        {i18n.t('landing.versioning.form.error')}
      </div>
    }

    <form onSubmit={onFormSubmit}>
      <h3 className="new-version__title">{i18n.t('landing.versioning.form.newVersion')}</h3>
      <label className="new-version__label">{i18n.t('landing.versioning.form.versionNumber')}</label><br />
      <VersionInput value={newVersionForm.versionNumber} onChange={onChange} /><br />
      <label className="new-version__label">{i18n.t('landing.versioning.form.date')}</label><br />
      <DateInput value={newVersionForm.publishedAt} onChange={onChange} /> <br />
      <div className="new-version__button-container">
        <button className="btn btn-secondary" onClick={goBack}>{i18n.t('landing.versioning.form.cancel')}</button>
        <input className="btn btn-primary" type="submit" />
      </div>

    </form>
  </div>
    ;
};
