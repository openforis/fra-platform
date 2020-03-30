import './description.less'

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import RichTextEditor from '@webapp/app/components/richTextEditor'
import Title from './components/title'
import Toggle from './components/toggle'
import useDescription from './useDescription'

const Description = props => {
  const { title, name, section, template, disabled, showAlertEmptyContent, showDashEmptyContent } = props
  const i18n = useI18n()
  const userInfo = useUserInfo()

  const [open, setOpen] = useState(false)

  const { value, loading, onChange } = useDescription(name, section, template)
  const error = userInfo && showAlertEmptyContent && !value && !loading

  const __html = value || template

  return (
    <div className="fra-description__header-row">
      <Title error={error} title={title} i18n={i18n} />
      {!disabled && <Toggle setOpen={setOpen} open={open} i18n={i18n} />}
      {open && <RichTextEditor value={__html} name={name} onChange={onChange} />}
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
