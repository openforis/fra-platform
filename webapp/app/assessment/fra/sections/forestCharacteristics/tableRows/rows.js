import useI18n from '@webapp/components/hooks/useI18n'

const tableRows = [
  {
    type: 'field',
    field: 'naturalForestArea',
    rowHeader: i18n.t('forestCharacteristics.naturalForestArea'),
    rowVariable: '(a)'
  },
  {
    type: 'custom',
    render: plantedForestRow
  },
  {
    type: 'field',
    field: 'plantationForestArea',
    rowHeader: i18n.t('forestCharacteristics.plantationForestArea')
  },
  {
    type: 'field',
    field: 'plantationForestIntroducedArea',
    validator: plantationForestValidator,
    className: 'fra-table__subcategory-cell',
    rowHeader: i18n.t('forestCharacteristics.plantationForestIntroducedArea')
  },
  {
    type: 'field',
    field: 'otherPlantedForestArea',
    rowHeader: i18n.t('forestCharacteristics.otherPlantedForestArea')
  },
  {
    type: 'custom',
    render: totalRow
  },
  {
    type: 'custom',
    render: totalForestAreaRow
  },
  {
    type: 'custom',
    render: () => <tr>
      <td rowSpan="2"></td>
    </tr>
  },
  {
    type: 'validationErrors',
    validationErrorMessages
  }
]

export default tableRows
