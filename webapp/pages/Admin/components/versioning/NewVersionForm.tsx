import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { format } from 'date-fns'
import useI18n from '@webapp/store/app/hooks/useI18n'
import { AdminState } from '@webapp/store/admin'
import * as BasePaths from '@webapp/main/basePaths'
import * as FRAVersion from '@common/versioning/fraVersion'
import { validField, versionIsGreater } from './versioningViewUtils'

type DateInputProps = {
  onChange: (...args: any[]) => any
  id: any
  value: any
}
const DateInput = (props: DateInputProps) => {
  const { onChange } = props
  const minDate = format(new Date(), 'yyyy-MM-ddThh:mm')
  const maxDate = format(new Date(`${new Date().getUTCFullYear() + 2}`), 'yyyy-MM-ddThh:mm')
  return (
    <input
      className="new-version__input"
      min={minDate}
      max={maxDate}
      onChange={onChange}
      type="datetime-local"
      name={FRAVersion.keys.publishedAt}
    />
  )
}
type VersionInputProps = {
  onChange: (...args: any[]) => any
  id: any
  value: any
}
const VersionInput = (props: VersionInputProps) => {
  const { onChange } = props
  return (
    <input
      className="new-version__input"
      onChange={onChange}
      placeholder="Ex. 1.0.0"
      type="text"
      name={FRAVersion.keys.versionNumber}
    />
  )
}
type NewVersionFormProps = {
  onChange: (...args: any[]) => any
  onSubmit: (...args: any[]) => any
}
const NewVersionForm = (props: NewVersionFormProps) => {
  const { onSubmit, onChange } = props
  const [error, setError] = useState(null)
  const versions = useSelector(AdminState.getVersions) || {}
  const newVersionForm = useSelector(AdminState.getNewVersionForm) || {}
  const history = useHistory()
  const i18n = useI18n()
  const goBack = (event: any) => {
    event.preventDefault()
    history.goBack()
  }
  const onFormSubmit = (event: any) => {
    // Prevent <form> element doing page refresh on submit
    event.preventDefault()
    if (
      !(
        validField(newVersionForm, 'versionNumber') &&
        validField(newVersionForm, 'date') &&
        versionIsGreater(versions, FRAVersion.getVersionNumber(newVersionForm))
      )
    ) {
      setError(true)
      return
    }
    onSubmit()
    const url = BasePaths.getAdminVersioningLink()
    history.push(url)
  }
  return (
    <div className="new-version__container">
      {error && <div className="new-version__error-container">{(i18n as any).t('landing.versioning.form.error')}</div>}

      <form onSubmit={onFormSubmit}>
        <h3 className="new-version__title">{(i18n as any).t('landing.versioning.form.newVersion')}</h3>
        <label htmlFor="versioninput" className="new-version__label">
          {(i18n as any).t('landing.versioning.form.versionNumber')}
        </label>
        <br />
        <VersionInput id="versioninput" value={FRAVersion.getVersionNumber(newVersionForm)} onChange={onChange} />
        <br />
        <label htmlFor="dateinput" className="new-version__label">
          {(i18n as any).t('landing.versioning.form.date')}
        </label>
        <br />
        <DateInput id="dateinput" value={FRAVersion.getPublishedAt(newVersionForm)} onChange={onChange} /> <br />
        <div className="new-version__button-container">
          <button type="button" className="btn btn-secondary" onClick={goBack}>
            {(i18n as any).t('landing.versioning.form.cancel')}
          </button>
          <input className="btn btn-primary" type="submit" />
        </div>
      </form>
    </div>
  )
}
export default NewVersionForm
