import './Description.scss'
import React, { useEffect, useState } from 'react'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import useDescription from '@client/store/pages/assessmentSection/hooks/useDescription'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
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
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const user = useUser()
  // const [printView] = [false] // TODO: usePrintView()
  const value = useDescription({ name, sectionName: section, template })
  const [open, setOpen] = useState(false)

  const onChange = console.log

  const error = user && showAlertEmptyContent && !value
  const markdown = value || template
  // if (printView) __html = __html?.split('<p>&nbsp;</p>').join('') // Hack to replace empty lines in print view

  useEffect(() => {
    dispatch(
      AssessmentSectionActions.getDescription({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        sectionName: section,
        name,
      })
    )
  }, [assessment.props.name, countryIso, cycle.name, dispatch, name, section])

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
