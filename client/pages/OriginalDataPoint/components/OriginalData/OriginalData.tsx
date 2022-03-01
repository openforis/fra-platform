import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { NavLink, useParams } from 'react-router-dom'
// import { useAssessmentSections } from '@client/store/assessment'
import { useTranslation } from 'react-i18next'
import { useCountryIso } from '@client/hooks'
import { BasePaths } from '@client/basePaths'
import { AssessmentName } from '@meta/assessment'

import ExtentOfForest from '../ExtentOfForest'
import ForestCharacteristics from '../ForestCharacteristics'

type Props = {
  canEditData: boolean
}

const OriginalData: React.FC<Props> = (props) => {
  const { canEditData } = props
  // const sections = useAssessmentSections()
  const { assessmentName, cycleName, odpId } =
    useParams<{ assessmentName: AssessmentName; cycleName: string; odpId: string }>()

  const extentOfForest = {
    name: 'extentOfForest',
    anchor: '1a',
  } // TODO : sections[0].subSections[0].props.name
  const forestCharacteristics = { name: 'forestCharacteristics', anchor: '1b' } // FRA.sections['1'].children.b

  const i18n = useTranslation()
  const countryIso = useCountryIso()
  // const useOriginalDataPointsInFoc = {} // TODO:  useSelector(CountryState.getConfigUseOriginalDataPointsInFoc)

  return (
    <div>
      <h2 className="headline">{i18n.t('nationalDataPoint.reclassificationLabel')}</h2>

      <div className="odp__tab-controller">
        <NavLink
          className="odp__tab-item"
          activeClassName="active"
          to={BasePaths.Assessment.OriginalDataPoint.section(
            countryIso,
            assessmentName,
            cycleName,
            odpId,
            extentOfForest.name
          )}
        >
          {`${extentOfForest.anchor} ${i18n.t('nationalDataPoint.forestCategoriesLabel')}`}
        </NavLink>
        <NavLink
          // className={`odp__tab-item${useOriginalDataPointsInFoc ? '' : ' disabled'}`}
          className="odp__tab-item"
          activeClassName="active"
          to={BasePaths.Assessment.OriginalDataPoint.section(
            countryIso,
            assessmentName,
            cycleName,
            odpId,
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
