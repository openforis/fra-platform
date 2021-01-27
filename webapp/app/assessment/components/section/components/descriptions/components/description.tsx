import './description.less'

import React, { useState } from 'react'

import { useI18n, usePrintView, useUserInfo } from '@webapp/components/hooks'

import RichTextEditor from '@webapp/components/richTextEditor'
import Title from './components/title'
import Toggle from './components/toggle'
import useDescription from './useDescription'

type OwnProps = {
  disabled?: boolean
  title: string
  name: string
  template?: string
  section: string
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof Description.defaultProps

// @ts-expect-error ts-migrate(7022) FIXME: 'Description' implicitly has type 'any' because it... Remove this comment to see the full error message
const Description = (props: Props) => {
  const { title, name, section, template, disabled, showAlertEmptyContent, showDashEmptyContent } = props
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const [printView] = usePrintView()
  const [open, setOpen] = useState(false)

  const { value, loading, onChange } = useDescription(name, section, template)
  const error = userInfo && showAlertEmptyContent && !value && !loading

  let __html = value || template
  if (printView) __html = __html.split('<p>&nbsp;</p>').join('') // Hack to replace empty lines in print view

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
  disabled: false,
  template: null,
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}

export default Description
