import React from 'react'

// import DefinitionLink from '@webapp/components/definitionLink'
import { useTranslation } from 'react-i18next'
import { useOriginalDataPoint } from '@client/store/data/originalDataPoint'
import { ODPs } from '@meta/assessment/originalDataPoint'
import { Numbers } from '@core/utils'
import ForestCharacteristicsPlantation from './ForestCharacteristicsPlantation'
import ForestCharacteristicsRow from './ForestCharacteristicsRow'

type Props = {
  canEditData: boolean
}

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()

  const { i18n } = useTranslation()
  const [printView] = [false] // TODO: usePrintView()

  const nationalClasses = originalDataPoint.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)
  const plantationTotal = ODPs.calcTotalSubFieldArea({
    odp: originalDataPoint,
    field: 'forestPercent',
    subField: 'plantationPercent',
  })
  const hasPlantation = plantationTotal && Numbers.greaterThan(plantationTotal, 0)

  return (
    <div className="odp__section">
      {!printView && (
        <div className="odp__section-header">
          <h3 className="subhead">{i18n.t('nationalDataPoint.forestCharacteristics')}</h3>
          {/* <DefinitionLink */}
          {/*  document="tad" */}
          {/*  anchor="1b" */}
          {/*  title={i18n.t('definition.definitionLabel')} */}
          {/*  lang={i18n.language} */}
          {/* /> */}
        </div>
      )}

      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <table className="fra-table">
            <tbody>
              <tr>
                {printView && (
                  <th className="fra-table__header-cell odp__year-column" rowSpan={nationalClasses.length + 3}>
                    {originalDataPoint.year}
                  </th>
                )}
                <th className="fra-table__header-cell fra-table__divider" colSpan={2}>
                  {i18n.t('nationalDataPoint.nationalClasses')}
                </th>
                <th className="fra-table__header-cell" colSpan={3}>
                  {i18n.t('nationalDataPoint.fraClasses')}
                </th>
              </tr>

              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.class')}</th>
                <th className="fra-table__header-cell fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
                <th className="fra-table__header-cell">
                  {i18n.t('fraForestCharacteristicsClass.naturallyRegeneratingForest')}
                </th>
                <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.plantationForest')}</th>
                <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.otherPlantedForest')}</th>
              </tr>

              {nationalClasses.map((nationalClass, index) => (
                <ForestCharacteristicsRow
                  key={nationalClass.name}
                  canEditData={canEditData}
                  index={index}
                  odp={originalDataPoint}
                />
              ))}

              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
                <th className="fra-table__calculated-cell fra-table__divider">
                  {Numbers.format(ODPs.calcTotalFieldArea({ odp: originalDataPoint, field: 'forestPercent' }))}
                </th>
                <td className="fra-table__calculated-cell">
                  {Numbers.format(
                    ODPs.calcTotalSubFieldArea({
                      odp: originalDataPoint,
                      field: 'forestPercent',
                      subField: 'naturalForestPercent',
                    })
                  )}
                </td>
                <td className="fra-table__calculated-cell">
                  {Numbers.format(
                    ODPs.calcTotalSubFieldArea({
                      odp: originalDataPoint,
                      field: 'forestPercent',
                      subField: 'plantationPercent',
                    })
                  )}
                </td>
                <td className="fra-table__calculated-cell">
                  {Numbers.format(
                    ODPs.calcTotalSubFieldArea({
                      odp: originalDataPoint,
                      field: 'forestPercent',
                      subField: 'otherPlantedPercent',
                    })
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {hasPlantation && <ForestCharacteristicsPlantation canEditData={canEditData} odp={originalDataPoint} />}
    </div>
  )
}

export default ForestCharacteristics
