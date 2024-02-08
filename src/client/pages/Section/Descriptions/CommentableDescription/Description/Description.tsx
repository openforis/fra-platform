import './Description.scss'
import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react'

import { Objects } from 'utils/objects'

import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { DataActions, useCommentableDescriptionValue } from 'client/store/data'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'

import Title from './Title'
import Toggle from './Toggle'

type Props = PropsWithChildren<{
  // disabled?: boolean
  title: string
  name: CommentableDescriptionName
  template?: CommentableDescriptionValue
  sectionName: string
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}>

const Description: React.FC<Props> = (props) => {
  const { children, title, name, sectionName, template, showAlertEmptyContent, showDashEmptyContent } = props
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  // const section = useSection(sectionName)
  // const editable = useIsDescriptionEditable({ sectionName, name })
  const editable = false

  // const descriptions = section.props.descriptions[cycle.uuid]
  // const descriptionsMetadata = useDescriptions({ sectionName, descriptions })

  const user = useUser()
  // const { print } = useIsPrintRoute()
  const value = useCommentableDescriptionValue({ name, sectionName, template })
  // const { t } = useTranslation()

  const textContent = useMemo<string>(() => {
    const { innerText } = new DOMParser().parseFromString(value.text, 'text/html').documentElement
    return innerText
  }, [value.text])

  const error = useMemo<boolean>(
    () => Boolean(user && showAlertEmptyContent && Objects.isEmpty(textContent)),
    [showAlertEmptyContent, textContent, user]
  )
  // const isFra2020 = useIsFra2020()

  const [open] = useState(false)

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

  // const error = user && showAlertEmptyContent && !value.text
  // console.log(user, showAlertEmptyContent, commentableDescriptionValue)
  const { text } = value // template.text
  // if (print) text = text?.split('<p>&nbsp;</p>').join('') // Hack to replace empty lines in print view

  // const isDataSources = name === 'dataSources'
  // const shouldShowEditor = ['introductoryText', 'generalComments'].includes(name)

  // const dataSourceHasTable = isDataSources && descriptionsMetadata.nationalData?.dataSources?.table
  // const hasText = shouldShowEditor || Boolean(descriptionsMetadata.nationalData?.dataSources?.text)
  // const dataSourceTextReadOnly = isDataSources && descriptionsMetadata.nationalData?.dataSources?.text?.readOnly

  // const showMarkdownEditor = hasText && ((!isDataSources && open) || (isDataSources && open && !dataSourceTextReadOnly))
  //
  // // 0. text metadata is defined
  // const showPreview =
  //   hasText &&
  //   // 1. not data source: Show markdown preview if description is not open and it has text
  //   ((!isDataSources && !open && text) ||
  //     // 2. data source: Show markdown preview if description is not open and it is not read only
  //     (isDataSources && !open && !dataSourceTextReadOnly) ||
  //     // 3. data source: Show markdown preview if description is open and it is read only (preview of previous cycle) and has text
  //     (isDataSources && open && dataSourceTextReadOnly && text))

  return (
    <div className="fra-description__header-row">
      <Title error={error} title={title} />
      <Toggle sectionName={sectionName} name={name} />

      {children && React.Children.toArray(children)}

      {!children && (
        <div className="fra-description__preview">
          <EditorWYSIWYG
            disabled={!editable}
            onChange={(content) => onChange({ ...value, text: content })}
            options={{ inline: true }}
            value={!open && Objects.isEmpty(textContent) && showDashEmptyContent ? '-' : text}
          />
        </div>
      )}

      {/* {dataSourceHasTable && ( */}
      {/*  <DataSources */}
      {/*    commentableDescriptionValue={commentableDescriptionValue} */}
      {/*    onChange={onChange} */}
      {/*    disabled={!open} */}
      {/*    sectionName={sectionName} */}
      {/*  /> */}
      {/* )} */}

      {/* {open && !Objects.isEmpty(text) && dataSourceTextReadOnly && ( */}
      {/*  <p>{t('nationalDataPoint.dataSource2025ExplanatoryText')}</p> */}
      {/* )} */}
      {/* {showMarkdownEditor && ( */}
      {/*  <div className="fra-description__preview"> */}
      {/*    <EditorWYSIWYG */}
      {/*      value={text} */}
      {/*      onChange={(content) => onChange({ ...commentableDescriptionValue, text: content })} */}
      {/*    /> */}
      {/*  </div> */}
      {/* )} */}
      {/* {showPreview && ( */}
      {/*  <div className="fra-description__preview"> */}
      {/*    <MarkdownPreview allowImages={isFra2020} value={text} /> */}
      {/*  </div> */}
      {/* )} */}
      {/* {!open && !text && showDashEmptyContent && <div>-</div>} */}
    </div>
  )
}

Description.defaultProps = {
  // disabled: false,
  template: { text: '' },
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}

export default Description
