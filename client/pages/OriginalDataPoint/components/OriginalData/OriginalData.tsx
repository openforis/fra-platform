import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { NavLink, useParams } from 'react-router-dom'
// import { useAssessmentSections } from '@client/store/assessment'
import { useTranslation } from 'react-i18next'
import { useCountryIso } from '@client/hooks'
import { BasePaths } from '@client/basePaths'
import { AssessmentName } from '@meta/assessment'

import classNames from 'classnames'
import { useAssessmentCountry } from '@client/store/assessment'
import ExtentOfForest from '../ExtentOfForest'
import ForestCharacteristics from '../ForestCharacteristics'

type Props = {
  canEditData: boolean
}

const OriginalData: React.FC<Props> = (props) => {
  const { canEditData } = props
  const country = useAssessmentCountry()
  // const sections = useAssessmentSections()
  const { assessmentName, cycleName, year } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
    year: string
  }>()

  const extentOfForest = {
    name: 'extentOfForest',
    anchor: '1a',
  } // TODO : sections[0].subSections[0].props.name
  const forestCharacteristics = { name: 'forestCharacteristics', anchor: '1b' } // FRA.sections['1'].children.b

  const i18n = useTranslation()
  const countryIso = useCountryIso()

  return (
    <div>
      <h2 className="headline">{i18n.t('nationalDataPoint.reclassificationLabel')}</h2>

      <div className="odp__tab-controller">
        <NavLink
          className={classNames('odp__tab-item', { disabled: year === '-1' })}
          activeClassName="active"
          to={BasePaths.Assessment.OriginalDataPoint.section(
            countryIso,
            assessmentName,
            cycleName,
            year,
            extentOfForest.name
          )}
        >
          {`${extentOfForest.anchor} ${i18n.t('nationalDataPoint.forestCategoriesLabel')}`}
        </NavLink>
        <NavLink
          className={classNames('odp__tab-item', {
            disabled: year === '-1' || !country.props.forestCharacteristics.useOriginalDataPoint,
          })}
          activeClassName="active"
          to={BasePaths.Assessment.OriginalDataPoint.section(
            countryIso,
            assessmentName,
            cycleName,
            year,
            forestCharacteristics.name
          )}
        >
          {`${forestCharacteristics.anchor} ${i18n.t('nationalDataPoint.forestCharacteristics')}`}
        </NavLink>
      </div>

      <Switch>
        <Redirect
          from={BasePaths.Assessment.OriginalDataPoint.one()}
          to={BasePaths.Assessment.OriginalDataPoint.tab(extentOfForest.name)}
          exact
        />
        <Route path={BasePaths.Assessment.OriginalDataPoint.tab(extentOfForest.name)} exact>
          <ExtentOfForest canEditData={canEditData} />
        </Route>
        <Route path={BasePaths.Assessment.OriginalDataPoint.tab(forestCharacteristics.name)} exact>
          <ForestCharacteristics canEditData={canEditData} />
        </Route>
      </Switch>
    </div>
  )
}

export default OriginalData
