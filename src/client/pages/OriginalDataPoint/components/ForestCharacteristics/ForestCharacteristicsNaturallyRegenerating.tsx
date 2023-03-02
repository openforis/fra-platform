import React from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from '@utils/numbers'

import { ODPs } from '@meta/assessment'
import { NationalClassValidation } from '@meta/assessment/originalDataPoint/odps/validateODP'

import { useOriginalDataPoint } from '@client/store/ui/originalDataPoint'

import NationalClassValidations from '../NationalClassValidations'
import ForestCharacteristicsNaturallyRegeneratingRow from './ForestCharacteristicsNaturallyRegeneratingRow'

type Props = {
  canEditData: boolean
  nationalClassValidations: Array<NationalClassValidation>
}

const ForestCharacteristicsNaturallyRegenerating: React.FC<Props> = (props) => {
  const { canEditData, nationalClassValidations } = props
  const originalDataPoint = useOriginalDataPoint()
  const { t } = useTranslation()

  const nationalClasses = originalDataPoint?.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)

  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table odp__sub-table">
          <thead>
            <tr>
              <th className="fra-table__header-cell-left">
                {t('fraForestCharacteristicsClass.naturallyRegeneratingForest')}
              </th>
              <th className="fra-table__header-cell fra-table__divider">{t('nationalDataPoint.area')}</th>
              <th className="fra-table__header-cell">{t('fraForestCharacteristicsClass.ofWhichPrimaryForest')}</th>
            </tr>
          </thead>

          <tbody>
            {nationalClasses?.map((nationalClass, index) => (
              <ForestCharacteristicsNaturallyRegeneratingRow
                key={nationalClass.name}
                canEditData={canEditData}
                index={index}
                nationalClassValidation={nationalClassValidations[index]}
              />
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th className="fra-table__header-cell-left">{t('nationalDataPoint.total')}</th>
              <th className="fra-table__calculated-cell fra-table__divider">
                {originalDataPoint &&
                  Numbers.format(
                    ODPs.calcTotalSubFieldArea({
                      originalDataPoint,
                      field: 'forestPercent',
                      subField: 'forestNaturalPercent',
                    })
                  )}
              </th>
              <td className="fra-table__calculated-cell">
                {originalDataPoint &&
                  Numbers.format(
                    ODPs.calcTotalSubSubFieldArea({
                      originalDataPoint,
                      field: 'forestPercent',
                      subField: 'forestNaturalPercent',
                      subSubField: 'forestNaturalForestOfWhichPrimaryForestPercent',
                    })
                  )}
              </td>
            </tr>
          </tfoot>
        </table>

        <NationalClassValidations
          nationalClasses={nationalClasses}
          nationalClassValidations={nationalClassValidations}
          variable="validPrimaryForest"
        />
      </div>
    </div>
  )
}
export default ForestCharacteristicsNaturallyRegenerating
