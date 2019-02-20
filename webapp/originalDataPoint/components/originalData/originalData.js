import React from 'react'

import { Link } from '../../../reusableUiComponents/link'

import ExtentOfForestSection from './extentOfForestSection'
import ForestCharacteristicsSection from './forestCharacteristicsSection'

const OriginalData = props => {

  const {
    match, odp, i18n, useOriginalDataPointsInFoc,
    saveDraft, openThread,
  } = props

  const { countryIso, tab } = match.params

  return (
    <div>
      <h2 className="headline">{i18n.t('nationalDataPoint.reclassificationLabel')}</h2>

      <div className="odp__tab-controller">
        <Link
          className={`odp__tab-item ${tab === 'extentOfForest' ? 'active' : null}`}
          to={`/country/${countryIso}/odp/extentOfForest/${odp.odpId ? odp.odpId : null}`}>
          1a {i18n.t('nationalDataPoint.forestCategoriesLabel')}
        </Link>
        {
          useOriginalDataPointsInFoc
            ? <Link
              className={`odp__tab-item ${tab === 'forestCharacteristics' ? 'active' : null}`}
              to={`/country/${countryIso}/odp/forestCharacteristics/${odp.odpId ? odp.odpId : null}`}>
              1b {i18n.t('nationalDataPoint.forestCharacteristics')}
            </Link>
            : <span className="odp__tab-item">
            1b {i18n.t('nationalDataPoint.forestCharacteristics')}
              <span className="odp__tab-item-support">({i18n.t('nationalDataPoint.disabled')})</span>
          </span>
        }
      </div>

      {
        tab === 'extentOfForest'
          ? (
            <ExtentOfForestSection
              odp={odp}
              countryIso={countryIso}
              saveDraft={saveDraft}
              openThread={openThread}
              i18n={i18n}
            />
          )
          : (
            <ForestCharacteristicsSection
              odp={odp}
              countryIso={countryIso}
              saveDraft={saveDraft}
              openThread={openThread}
              i18n={i18n}
            />
          )
      }

    </div>
  )

}

export default OriginalData
