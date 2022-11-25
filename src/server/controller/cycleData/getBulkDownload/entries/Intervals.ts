export const entries = [
  {
    tableName: 'forestareachange',
    variables: [
      {
        csvColumn: '1d_expansion',
        variableName: 'forest_expansion',
      },
      {
        csvColumn: '1d_afforestation',
        variableName: 'afforestation',
      },
      {
        csvColumn: '1d_nat_exp',
        variableName: 'natural_expansion',
      },
      {
        csvColumn: '1d_deforestation',
        variableName: 'deforestation',
      },
    ],
  },
  {
    tableName: 'annualreforestation',
    variables: [
      {
        csvColumn: '1e_reforestation',
        variableName: 'reforestation',
      },
    ],
  },
]
