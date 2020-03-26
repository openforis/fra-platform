import './description.less'

import React, { useEffect, useState } from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'

import Icon from '@webapp/components/icon'
import Tooltip from '@webapp/components/tooltip'

import RichTextEditor from '@webapp/app/components/description/RichTextEditor'
import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useGetRequest from '@webapp/components/hooks/useGetRequest'

const getUrl = (countryIso, section, name) => `/api/country/descriptions/${countryIso}/${section}/${name}`

const Toggle = ({ setOpen, open, i18n }) => {
  return (
    <span
      role="button"
      aria-label=""
      tabIndex={0}
      className="fra-description__link no-print"
      onClick={() => {
        setOpen(!open)
      }}
      onKeyDown={() => {}}
    >
      {open ? i18n.t('description.done') : i18n.t('description.edit')}
    </span>
  )
}
Toggle.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  i18n: PropTypes.object.isRequired,
}

const Title = ({ error, title, i18n }) => {
  return (
    <h3 className={`subhead fra-description__header${error ? ' icon-red' : ''}`}>
      {error ? (
        <Tooltip error text={i18n.t('generalValidation.emptyField')}>
          {title} <Icon key="icon-error" className="icon-margin-left icon-red" name="alert" />
        </Tooltip>
      ) : (
        <>{title}</>
      )}
    </h3>
  )
}
Title.propTypes = {
  error: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
}

const Description = props => {
  const { title, name, section, template, disabled, showAlertEmptyContent, showDashEmptyContent } = props
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const userInfo = useUserInfo()

  const [open, setOpen] = useState(false)
  const { data = null, loading, dispatch: fetchData } = useGetRequest(getUrl(countryIso, section, name))

  useEffect(fetchData, [open])

  const content = R.pathOr(null, ['dataSources', 'content'], data)
  const error = userInfo && showAlertEmptyContent && !content && !loading
  const __html = content || template

  return (
    <div className="fra-description__header-row">
      <Title error={error} title={title} i18n={i18n} />
      {!disabled && <Toggle setOpen={setOpen} open={open} i18n={i18n} />}
      {open && <RichTextEditor section={section} name={name} template={template} content={content} />}
      {!open && __html && <div className="fra-description__preview" dangerouslySetInnerHTML={{ __html }} />}
      {!open && !__html && showDashEmptyContent && <div>-</div>}
    </div>
  )
}

Description.defaultProps = {
  template: null,
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}

Description.propTypes = {
  disabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  template: PropTypes.string,
  section: PropTypes.string.isRequired,
  showAlertEmptyContent: PropTypes.bool,
  showDashEmptyContent: PropTypes.bool,
}

export default Description
