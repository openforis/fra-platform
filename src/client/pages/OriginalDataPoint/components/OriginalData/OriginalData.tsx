import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'
import classNames from 'classnames'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'
import { Routes } from 'meta/routes/routes'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryIso } from 'client/hooks/country'
import { useOriginalDataPointRouteParams } from 'client/hooks/routeParams'
import ValidationErrorIndicator from 'client/components/ValidationErrorIndicator'
import Comments from 'client/pages/OriginalDataPoint/components/Comments'
import ExtentOfForest from 'client/pages/OriginalDataPoint/components/ExtentOfForest'
import ForestCharacteristics from 'client/pages/OriginalDataPoint/components/ForestCharacteristics'
import { useNDPSectionHasErrors } from 'client/pages/OriginalDataPoint/components/OriginalData/hooks/useNDPSectionHasErrors'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const OriginalData: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const cycle = useCycle()
  const country = useAssessmentCountry()
  const { assessmentName, cycleName, sectionName, year } = useOriginalDataPointRouteParams()

  const extentOfForest = { name: 'extentOfForest', anchor: '1a' }
  const forestCharacteristics = { name: 'forestCharacteristics', anchor: '1b' }

  const { t } = useTranslation()
  const countryIso = useCountryIso()

  const isExtentOfForestSection = sectionName === extentOfForest.name

  const extentOfForestDisabled = year === '-1'
  const forestCharacteristicsDisabled = year === '-1' || !country.props.forestCharacteristics.useOriginalDataPoint

  const extentOfForestHasErrors = useNDPSectionHasErrors({ originalDataPoint, sectionName: extentOfForest.name })
  const forestCharacteristicsHasErrors = useNDPSectionHasErrors({
    originalDataPoint,
    sectionName: forestCharacteristics.name,
  })

  return (
    <div>
      <h3 className="subhead">{t('nationalDataPoint.reclassificationLabel')}</h3>

      <div className="odp__tab-controller">
        <NavLink
          className={(navData): string =>
            classNames('odp__tab-item', {
              disabled: extentOfForestDisabled,
              active: navData.isActive,
            })
          }
          to={Routes.OriginalDataPoint.generatePath({
            countryIso,
            assessmentName,
            cycleName,
            year,
            sectionName: extentOfForest.name,
          })}
        >
          {`${extentOfForest.anchor} ${t(
            `nationalDataPoint.forestCategoriesLabel${cycle.name !== '2020' ? '2025' : ''}`
          )}`}
          <ValidationErrorIndicator show={!extentOfForestDisabled && extentOfForestHasErrors} />
        </NavLink>
        <NavLink
          className={(navData): string =>
            classNames('odp__tab-item', {
              disabled: forestCharacteristicsDisabled,
              active: navData.isActive,
            })
          }
          to={Routes.OriginalDataPoint.generatePath({
            countryIso,
            assessmentName,
            cycleName,
            year,
            sectionName: forestCharacteristics.name,
          })}
        >
          {`${forestCharacteristics.anchor} ${t('nationalDataPoint.forestCharacteristics')}`}
          <ValidationErrorIndicator show={!forestCharacteristicsDisabled && forestCharacteristicsHasErrors} />
        </NavLink>
      </div>

      {isExtentOfForestSection ? (
        <ExtentOfForest canEditData={canEditData} originalDataPoint={originalDataPoint} />
      ) : (
        <ForestCharacteristics canEditData={canEditData} originalDataPoint={originalDataPoint} />
      )}

      <Comments field={isExtentOfForestSection ? TableNames.extentOfForest : TableNames.forestCharacteristics} />
    </div>
  )
}

export default OriginalData
