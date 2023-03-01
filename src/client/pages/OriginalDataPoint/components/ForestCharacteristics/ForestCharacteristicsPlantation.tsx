import React from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from '@utils/numbers'

import { ODPs } from '@meta/assessment'
import { NationalClassValidation } from '@meta/assessment/originalDataPoint/odps/validateODP'

import { useOriginalDataPoint } from '@client/store/ui/originalDataPoint'
import Icon from '@client/components/Icon'

import ForestCharacteristicsPlantationRow from './ForestCharacteristicsPlantationRow'

type Props = {
  canEditData: boolean
  nationalClassValidations: Array<NationalClassValidation>
}

const ForestCharacteristicsPlantation: React.FC<Props> = (props) => {
  const { canEditData, nationalClassValidations } = props
  const originalDataPoint = useOriginalDataPoint()
  const { t } = useTranslation()

  const nationalClasses = originalDataPoint?.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)

  const hasErrors = nationalClassValidations.some((v) => !v.validForestPlantationIntroducedPercent)

  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table odp__sub-table">
          <thead>
            <tr>
              <th className="fra-table__header-cell-left">{t('fraForestCharacteristicsClass.plantationForest')}</th>
              <th className="fra-table__header-cell fra-table__divider">{t('nationalDataPoint.area')}</th>
              <th className="fra-table__header-cell">{t('fraForestCharacteristicsClass.ofWhichIntroduced')}</th>
            </tr>
          </thead>

          <tbody>
            {nationalClasses?.map((nationalClass, index) => (
              <ForestCharacteristicsPlantationRow
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
                      subField: 'forestPlantationPercent',
                    })
                  )}
              </th>
              <td className="fra-table__calculated-cell">
                {originalDataPoint &&
                  Numbers.format(
                    ODPs.calcTotalSubSubFieldArea({
                      originalDataPoint,
                      field: 'forestPercent',
                      subField: 'forestPlantationPercent',
                      subSubField: 'forestPlantationIntroducedPercent',
                    })
                  )}
              </td>
            </tr>
          </tfoot>
        </table>

        {hasErrors && (
          <div className="data-validations">
            <Icon name="alert" />
            {nationalClassValidations.map(
              (nationalClassValidation, index) =>
                !nationalClassValidation.validForestPlantationIntroducedPercent && (
                  <div className="msg" key={nationalClasses[index].name}>
                    {t('generalValidation.classValueNotGreaterThan', { name: nationalClasses[index].name, value: 100 })}
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default ForestCharacteristicsPlantation
