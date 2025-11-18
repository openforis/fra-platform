import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useParams } from 'react-router-dom'

import classNames from 'classnames'

import { AssessmentName } from 'meta/assessment/assessment'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'
import { Routes } from 'meta/routes/routes'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryIso } from 'client/hooks/country'
import Comments from 'client/pages/OriginalDataPoint/components/Comments'
import ExtentOfForest from 'client/pages/OriginalDataPoint/components/ExtentOfForest'
import ForestCharacteristics from 'client/pages/OriginalDataPoint/components/ForestCharacteristics'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const OriginalData: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const cycle = useCycle()
  const country = useAssessmentCountry()
  const { assessmentName, cycleName, sectionName, year } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
    year: string
    sectionName: string
  }>()

  const extentOfForest = {
    name: 'extentOfForest',
    anchor: '1a',
  }
  const forestCharacteristics = { name: 'forestCharacteristics', anchor: '1b' }

  const i18n = useTranslation()
  const countryIso = useCountryIso()

  const isExtentOfForestSection = sectionName === extentOfForest.name

  return (
    <div>
      <h3 className="subhead">{i18n.t<string>('nationalDataPoint.reclassificationLabel')}</h3>

      <div className="odp__tab-controller">
        <NavLink
          className={(navData): string =>
            classNames('odp__tab-item', {
              disabled: year === '-1',
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
          {`${extentOfForest.anchor} ${i18n.t(
            `nationalDataPoint.forestCategoriesLabel${cycle.name !== '2020' ? '2025' : ''}`
          )}`}
        </NavLink>
        <NavLink
          className={(navData): string =>
            classNames('odp__tab-item', {
              disabled: year === '-1' || !country.props.forestCharacteristics.useOriginalDataPoint,
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
          {`${forestCharacteristics.anchor} ${i18n.t('nationalDataPoint.forestCharacteristics')}`}
        </NavLink>
      </div>

      {isExtentOfForestSection ? (
        <ExtentOfForest canEditData={canEditData} originalDataPoint={originalDataPoint} />
      ) : (
        <ForestCharacteristics canEditData={canEditData} originalDataPoint={originalDataPoint} />
      )}

      <Comments
        canEditData={canEditData}
        field={isExtentOfForestSection ? TableNames.extentOfForest : TableNames.forestCharacteristics}
      />
    </div>
  )
}

export default OriginalData
