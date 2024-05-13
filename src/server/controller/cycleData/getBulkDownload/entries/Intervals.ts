import { Cycle } from 'meta/assessment'

export const entries = (cycle: Cycle) => {
  const arr = [
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
  ]

  if (cycle.name === '2020') {
    arr.push({
      tableName: 'reforestation',
      variables: [
        {
          csvColumn: '1d_reforestation',
          variableName: 'reforestation',
        },
      ],
    })
  }

  return arr
}
