import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import * as ObjectUtils from '@common/objectUtils'

import NationalDataDescriptions from '@webapp/app/assessment/components/description/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/app/assessment/components/description/analysisDescriptions'
import CommentableDescription from '@webapp/app/assessment/components/description/commentableDescription'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'

const Descriptions = props => {
  const { sectionName, descriptions, disabled } = props
  const { introductoryText, nationalData, analysisAndProcessing } = descriptions

  const useNationalData = useSelector(state =>
    ObjectUtils.isFunction(nationalData) ? nationalData(state) : nationalData
  )
  const useAnalysisAndProcessing = useSelector(state =>
    ObjectUtils.isFunction(analysisAndProcessing) ? analysisAndProcessing(state) : analysisAndProcessing
  )

  const countryIso = useCountryIso()
  const i18n = useI18n()

  return (
    <>
      {useNationalData && (
        <NationalDataDescriptions section={sectionName} countryIso={countryIso} disabled={disabled} />
      )}
      {useAnalysisAndProcessing && (
        <AnalysisDescriptions section={sectionName} countryIso={countryIso} disabled={disabled} />
      )}
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
