import './Description.scss'
import React, { useCallback, useEffect, useState } from 'react'

import { CommentableDescriptionValue } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/ui/assessmentSection'
import useDescription from '@client/store/ui/assessmentSection/hooks/useDescription'
import { useIsDataLocked } from '@client/store/ui/dataLock'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'
import EditorWYSIWYG from '@client/components/EditorWYSIWYG'
import MarkdownPreview from '@client/components/MarkdownPreview'
import DataSources from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSources'

import Title from './Title'
import Toggle from './Toggle'

type Props = {
  disabled?: boolean
  title: string
  name: string
  template?: CommentableDescriptionValue
  sectionName: string
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}

const Description: React.FC<Props> = (props) => {
  const { title, name, sectionName, template, disabled, showAlertEmptyContent, showDashEmptyContent } = props
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const user = useUser()
  const { print } = useIsPrint()
  const description = useDescription({ name, sectionName, template })
  const isDataLocked = useIsDataLocked()
  const [open, setOpen] = useState(false)

  const onChange = useCallback(
    (value: CommentableDescriptionValue) => {
      dispatch(
        AssessmentSectionActions.updateDescription({
          countryIso,
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          sectionName,
          name,
          value,
        })
      )
    },
    [assessment.props.name, countryIso, cycle.name, dispatch, name, sectionName]
  )

  const error = user && showAlertEmptyContent && !description
  let markdown = description.text || template.text
  if (print) markdown = markdown?.split('<p>&nbsp;</p>').join('') // Hack to replace empty lines in print view

  useEffect(() => {
    dispatch(
      AssessmentSectionActions.getDescription({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        sectionName,
        name,
      })
    )
  }, [assessment.props.name, countryIso, cycle.name, dispatch, name, sectionName])

  useEffect(() => {
    if (open && isDataLocked) {
      setOpen(!isDataLocked)
    }
  }, [isDataLocked, open])

  const isDataSources = name === 'dataSources'

  return (
    <div className="fra-description__header-row">
      <Title error={error} title={title} />
      {!disabled && <Toggle setOpen={setOpen} open={open} />}
      {isDataSources && (
        <DataSources description={description} onChange={onChange} disabled={!open} sectionName={sectionName} />
      )}
      {open && (
        <div className="fra-description__preview">
          <EditorWYSIWYG value={markdown} onChange={(content) => onChange({ ...description, text: content })} />
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
  template: { text: '' },
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}

export default Description
