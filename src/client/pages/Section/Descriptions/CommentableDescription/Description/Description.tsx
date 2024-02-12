import './Description.scss'
import React, { PropsWithChildren, useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions, useCommentableDescriptionValue } from 'client/store/data'
import { useIsDescriptionEditEnabled } from 'client/store/ui/assessmentSection'
import { useIsDescriptionEditable } from 'client/store/user/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'

import { useDescriptionErrorState } from '../hooks/useDescriptionErrorState'

type Props = PropsWithChildren<{
  name: CommentableDescriptionName
  template?: CommentableDescriptionValue
  sectionName: string
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}>

const Description: React.FC<Props> = (props) => {
  const { children, name, sectionName, template, showAlertEmptyContent, showDashEmptyContent } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  // const section = useSection(sectionName)
  const editable = useIsDescriptionEditable({ sectionName, name })
  const editEnabled = useIsDescriptionEditEnabled({ sectionName, name })
  const value = useCommentableDescriptionValue({ name, sectionName, template })
  const { empty } = useDescriptionErrorState({ showAlertEmptyContent, value })

  // const descriptions = section.props.descriptions[cycle.uuid]

  // const descriptionsMetadata = useDescriptions({ sectionName, descriptions })
  // const { print } = useIsPrintRoute()
  // const { t } = useTranslation()

  // const isFra2020 = useIsFra2020()

  const onChange = useCallback(
    (value: CommentableDescriptionValue) => {
      dispatch(DataActions.updateDescription({ assessmentName, cycleName, countryIso, sectionName, name, value }))
    },
    [assessmentName, countryIso, cycleName, dispatch, name, sectionName]
  )

  // const error = user && showAlertEmptyContent && !value.text
  // console.log(user, showAlertEmptyContent, commentableDescriptionValue)
  // const { text } = value // template.text
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
      {children && React.Children.toArray(children)}

      {!children && (
        <div className="fra-description__preview">
          <EditorWYSIWYG
            disabled={!editable}
            onChange={(content) => onChange({ ...value, text: content })}
            value={!editEnabled && empty && showDashEmptyContent ? '-' : value.text}
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
