const countryConfig = require('../server/service/country/countryConfig')

const toSql = (key, value) => `UPDATE country SET config = '${value}' WHERE country_iso = '${key}';`

Object.entries(countryConfig).forEach(([key, config]) => console.log(toSql(key, JSON.stringify(config)), '\n'))
