const FRA = require('../../../common/assessment/fra')
/**
 *  Utility function to transform array of objects to array of objects separated by year
 *  Input:
 *    [{
 *       '1990': '1531.1866032',
 *        ...
 *       '2020': '1295.4678944',
 *       countryIso: 'ZWE',
 *       id: '270662',
 *       rowName: 'growing_stock_total',
 *     }]
 *
 *  Output:
 *     [{
 *       "year": "1990",
 *       "countryIso": "ZWE",
 *       "value": "1531.1866032",
 *       "rowName": "growing_stock_total"
 *     },
 *          ...
 *     {
 *       "year": "2020",
 *       "countryIso": "ZWE",
 *       "value": "1295.4678944",
 *       "rowName": "growing_stock_total"
 *     }]
 *
 * @param {Object[]} array
 * @returns {Object[]} year
 */
const yearsToRowValue = (array) => {
  const result = []

  array.forEach((element) => {
    FRA.yearsTable.forEach((year) => {
      result.push({
        year,
        countryIso: element.countryIso,
        value: element[year],
        rowName: element.rowName,
      })
    })
  })
  return result
}

module.exports = {
  yearsToRowValue,
}

/* 
    yearsToRowValue ransforms:
     [
       {
         '1990': '1531.1866032',
         '2000': '1492.3566452',
         '2010': '1456.1534768',
         '2015': '1438.8535716',
         '2020': '1295.4678944',
         countryIso: 'ZWE',
         id: '270662',
         rowName: 'growing_stock_total',
       }
     ]
    
     to


  */
