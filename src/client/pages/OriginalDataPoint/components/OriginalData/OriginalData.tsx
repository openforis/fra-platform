import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useParams } from 'react-router-dom'

import classNames from 'classnames'

import { ClientRoutes } from 'meta/app'
import { AssessmentName, OriginalDataPoint } from 'meta/assessment'

import { useAssessmentCountry, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'

import ExtentOfForest from '../ExtentOfForest'
import ForestCharacteristics from '../ForestCharacteristics'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const OriginalData: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const cycle = useCycle()
  const country = useAssessmentCountry()
  const { assessmentName, cycleName, year, sectionName } = useParams<{
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

  return (
    <div>
      <h2 className="headline">{i18n.t<string>('nationalDataPoint.reclassificationLabel')}</h2>

      <div className="odp__tab-controller">
        <NavLink
          className={(navData) =>
            classNames('odp__tab-item', {
              disabled: year === '-1',
              active: navData.isActive,
            })
          }
          to={ClientRoutes.Assessment.Cycle.Country.OriginalDataPoint.Section.getLink({
            countryIso,
            assessmentName,
            cycleName,
            year,
            sectionName: extentOfForest.name,
          })}
        >
          {`${extentOfForest.anchor} ${i18n.t(`nationalDataPoint.forestCategoriesLabel${cycle.name === '2025' ? '2025' : ''}`)}`}
        </NavLink>
        <NavLink
          className={(navData) =>
            classNames('odp__tab-item', {
              disabled: year === '-1' || !country.props.forestCharacteristics.useOriginalDataPoint,
              active: navData.isActive,
            })
          }
          to={ClientRoutes.Assessment.Cycle.Country.OriginalDataPoint.Section.getLink({
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

      {sectionName === extentOfForest.name && <ExtentOfForest originalDataPoint={originalDataPoint} canEditData={canEditData} />}
      {sectionName !== extentOfForest.name && <ForestCharacteristics originalDataPoint={originalDataPoint} canEditData={canEditData} />}
    </div>
  )
}

export default OriginalData
