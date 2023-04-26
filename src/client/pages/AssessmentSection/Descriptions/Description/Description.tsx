import './Description.scss'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'

import { CommentableDescriptionValue } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useAssessment, useAssessmentSection, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/ui/assessmentSection'
import useDescription from '@client/store/ui/assessmentSection/hooks/useDescription'
import { useIsDataLocked } from '@client/store/ui/dataLock'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'
import EditorWYSIWYG from '@client/components/EditorWYSIWYG'
import MarkdownPreview from '@client/components/MarkdownPreview'
import DataSources from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSources'

import { useDescriptions } from '../Descriptions'
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
  const section = useAssessmentSection(sectionName)
  const descriptionsMetadata = useDescriptions({
    disabled,
    sectionName,
    descriptions: section.props.descriptions[cycle.uuid],
  })

  const user = useUser()
  const { print } = useIsPrint()
  const description = useDescription({ name, sectionName, template })
  const isDataLocked = useIsDataLocked()
  const { t } = useTranslation()

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
  let text = description.text || template.text
  if (print) text = text?.split('<p>&nbsp;</p>').join('') // Hack to replace empty lines in print view

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
  const isIntroductoryText = name === 'introductoryText'

  const dataSourceHasTable = isDataSources && descriptionsMetadata.nationalData?.dataSources?.table
  const hasText = isIntroductoryText || Boolean(descriptionsMetadata.nationalData?.dataSources?.text)
  const dataSourceTextReadOnly = isDataSources && descriptionsMetadata.nationalData?.dataSources?.text?.readOnly

  const showMarkdownEditor = hasText && ((!isDataSources && open) || (isDataSources && open && !dataSourceTextReadOnly))

  // 0. text metadata is defined
  const showPreview =
    hasText &&
    // 1. not data source: Show markdown preview if description is not open and it has text
    ((!isDataSources && !open && text) ||
      // 2. data source: Show markdown preview if description is not open and it is not read only
      (isDataSources && !open && !dataSourceTextReadOnly) ||
      // 3. data source: Show markdown preview if description is open and it is read only (preview of previous cycle) and has text
      (isDataSources && open && dataSourceTextReadOnly && text))

  return (
    <div className="fra-description__header-row">
      <Title error={error} title={title} />
      {!disabled && <Toggle setOpen={setOpen} open={open} />}
      {dataSourceHasTable && (
        <DataSources description={description} onChange={onChange} disabled={!open} sectionName={sectionName} />
      )}
      {open && !Objects.isEmpty(text) && dataSourceTextReadOnly && (
        <p>{t('nationalDataPoint.dataSource2025ExplanatoryText')}</p>
      )}
      {showMarkdownEditor && (
        <div className="fra-description__preview">
          <EditorWYSIWYG value={text} onChange={(content) => onChange({ ...description, text: content })} />
        </div>
      )}
      {showPreview && (
        <div className="fra-description__preview">
          <MarkdownPreview value={text} />
        </div>
      )}
      {!open && !text && showDashEmptyContent && <div>-</div>}
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
