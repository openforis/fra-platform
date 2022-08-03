import './Description.scss'
import React, { useState } from 'react'

import useDescription from '@client/store/pages/assessmentSection/hooks/useDescription'
import { useUser } from '@client/store/user'
import MarkdownEditor from '@client/components/MarkdownEditor'
import MarkdownPreview from '@client/components/MarkdownPreview'

import Title from './Title'
import Toggle from './Toggle'

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

  const user = useUser()
  // const [printView] = [false] // TODO: usePrintView()
  const value = useDescription(name, section, template)
  const [open, setOpen] = useState(false)

  const onChange = console.log

  const error = user && showAlertEmptyContent && !value
  const markdown = value || template
  // if (printView) __html = __html?.split('<p>&nbsp;</p>').join('') // Hack to replace empty lines in print view

  return (
    <div className="fra-description__header-row">
      <Title error={error} title={title} />
      {!disabled && <Toggle setOpen={setOpen} open={open} />}
      {open && (
        <div className="fra-description__preview">
          <MarkdownEditor value={markdown} onChange={onChange} />
        </div>
      )}
      {!open && markdown && (
        <div className="fra-description__preview">
          <MarkdownPreview value={markdown} />
        </div>
      )}
      {!open && !markdown && showDashEmptyContent && <div>-</div>}
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
