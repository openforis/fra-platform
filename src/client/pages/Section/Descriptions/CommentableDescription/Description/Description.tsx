import './Description.scss'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { CommentableDescriptionValue } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { DataActions, useCommentableDescriptionValue } from 'client/store/data'
import { useSection } from 'client/store/metadata'
import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { useIsFra2020 } from 'client/hooks/useIsFra2020'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import MarkdownPreview from 'client/components/MarkdownPreview'
import DataSources from 'client/pages/Section/Descriptions/CommentableDescription/Description/DataSources/DataSources'

import { useDescriptions } from '../../Descriptions'
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
  const section = useSection(sectionName)
  const descriptionsMetadata = useDescriptions({
    disabled,
    sectionName,
    descriptions: section.props.descriptions[cycle.uuid],
  })

  const user = useUser()
  const { print } = useIsPrintRoute()
  const commentableDescriptionValue = useCommentableDescriptionValue({ name, sectionName, template })
  const isDataLocked = useIsDataLocked()
  const { t } = useTranslation()

  const isFra2020 = useIsFra2020()

  const [open, setOpen] = useState(false)

  const onChange = useCallback(
    (value: CommentableDescriptionValue) => {
      dispatch(
        DataActions.updateDescription({
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

  const error = user && showAlertEmptyContent && !commentableDescriptionValue
  let text = commentableDescriptionValue.text || template.text
  if (print) text = text?.split('<p>&nbsp;</p>').join('') // Hack to replace empty lines in print view

  useEffect(() => {
    dispatch(
      DataActions.getDescription({
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
  const shouldShowEditor = ['introductoryText', 'generalComments'].includes(name)

  const dataSourceHasTable = isDataSources && descriptionsMetadata.nationalData?.dataSources?.table
  const hasText = shouldShowEditor || Boolean(descriptionsMetadata.nationalData?.dataSources?.text)
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
        <DataSources
          commentableDescriptionValue={commentableDescriptionValue}
          onChange={onChange}
          disabled={!open}
          sectionName={sectionName}
        />
      )}
      {open && !Objects.isEmpty(text) && dataSourceTextReadOnly && (
        <p>{t('nationalDataPoint.dataSource2025ExplanatoryText')}</p>
      )}
      {showMarkdownEditor && (
        <div className="fra-description__preview">
          <EditorWYSIWYG
            value={text}
            onChange={(content) => onChange({ ...commentableDescriptionValue, text: content })}
          />
        </div>
      )}
      {showPreview && (
        <div className="fra-description__preview">
          <MarkdownPreview allowImages={isFra2020} value={text} />
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
