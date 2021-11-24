import './Description.scss'
import React, { useState } from 'react'

import { usePrintView } from '../../../../../store/app'

import RichTextEditor from '../../../../../components/richTextEditor'
import { useUserInfo } from '../../../../../store/user'
import Title from './Title'
import Toggle from './Toggle'
import useDescription from './useDescription'

type Props = {
  disabled?: boolean
  title: string
  name: string
  template?: string
  section: string
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}

const Description: React.FC<Props> = (props) => {
  const { title, name, section, template, disabled, showAlertEmptyContent, showDashEmptyContent } = props

  const userInfo = useUserInfo()
  const [printView] = usePrintView()
  const { value, loading, onChange } = useDescription(name, section, template)
  const [open, setOpen] = useState(false)

  const error = userInfo && showAlertEmptyContent && !value && !loading
  let __html = value || template
  if (printView) __html = __html.split('<p>&nbsp;</p>').join('') // Hack to replace empty lines in print view

  return (
    <div className="fra-description__header-row">
      <Title error={error} title={title} />
      {!disabled && <Toggle setOpen={setOpen} open={open} />}
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
