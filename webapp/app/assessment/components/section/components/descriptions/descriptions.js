import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import * as ObjectUtils from '@common/objectUtils'

import NationalDataDescriptions from '@webapp/app/assessment/components/section/components/descriptions/components/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/app/assessment/components/section/components/descriptions/components/analysisDescriptions'
import CommentableDescription from '@webapp/app/assessment/components/section/components/descriptions/components/commentableDescription'
import useI18n from '@webapp/components/hooks/useI18n'

const Descriptions = (props) => {
  const { sectionName, descriptions, disabled } = props
  const { introductoryText, nationalData, analysisAndProcessing } = descriptions

  const useNationalData = useSelector((state) =>
    ObjectUtils.isFunction(nationalData) ? nationalData(state) : nationalData
  )
  const useAnalysisAndProcessing = useSelector((state) =>
    ObjectUtils.isFunction(analysisAndProcessing) ? analysisAndProcessing(state) : analysisAndProcessing
  )

  const i18n = useI18n()

  return (
    <>
      {useNationalData && <NationalDataDescriptions section={sectionName} disabled={disabled} />}
      {useAnalysisAndProcessing && <AnalysisDescriptions section={sectionName} disabled={disabled} />}
      {introductoryText && (
        <CommentableDescription
          section={sectionName}
          title={i18n.t('contactPersons.introductoryText')}
          name="introductoryText"
          template={i18n.t('contactPersons.introductoryTextSupport')}
          disabled={disabled}
        />
      )}
    </>
  )
}

Descriptions.propTypes = {
  sectionName: PropTypes.string.isRequired,
  descriptions: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default Descriptions
