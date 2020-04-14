module.exports = {
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

    [
      {
        "year": "1990",
        "countryIso": "ZWE",
        "value": "1531.1866032",
        "rowName": "growing_stock_total"
      },
      {
        "year": "2000",
        "countryIso": "ZWE",
        "value": "1492.3566452",
        "rowName": "growing_stock_total"
      },
      {
        "year": "2010",
        "countryIso": "ZWE",
        "value": "1456.1534768",
        "rowName": "growing_stock_total"
      },
      {
        "year": "2015",
        "countryIso": "ZWE",
        "value": "1438.8535716",
        "rowName": "growing_stock_total"
      },
      {
        "year": "2020",
        "countryIso": "ZWE",
        "value": "1295.4678944",
        "rowName": "growing_stock_total"
      }
    ]
  */
  yearsToRowValue: (array) => {
    const result = []
    const years = ['1990', '2000', '2010', '2015', '2020']

    array.forEach((element) => {
      years.forEach((year) => {
        result.push({
          year,
          countryIso: element.countryIso,
          value: element[year],
          rowName: element.rowName,
        })
      })
    })
    return result
  },
}
