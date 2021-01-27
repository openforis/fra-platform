import * as countryConfig from '../server/country/countryConfig'

const toSql = (key, value) => `UPDATE country SET config = '${value}' WHERE country_iso = '${key}';`

Object.entries(countryConfig).forEach(([key, config]) => console.log(toSql(key, JSON.stringify(config)), '\n'))
