import { CycleNames } from 'meta/assessment/cycle/names'

import type { GetReadmeTemplate, ReadmeYearsByCycle } from '../types'

const readmeYearsByCycle: ReadmeYearsByCycle = {
  [CycleNames._2020]: {
    yearRange: '1990-2000, 2000-2010, 2010-2015 or 2015-2020',
    years: '1990, 2000, 2010, 2015 and 2020',
  },
  [CycleNames._2025]: {
    yearRange: '1990-2000, 2000-2010, 2010-2015, 2015-2020 or 2020-2025',
    years: '1990, 2000, 2010, 2015, 2020 and 2025',
  },
}

export const getReadmeEn: GetReadmeTemplate = (props) => {
  const { cycleName } = props
  const { yearRange, years } = readmeYearsByCycle[cycleName]

  return `README

The bulk download zip archive contains three folders:

1. “Annual_variables”, which contains annual data on forest disturbances by variable (Diseases, Insects, Weather, Other and Fire). The data are structured as annual columns and available for the period 2000-until the last reporting year. Each file is named according to the structure of the FRA reports: [Section][SubSection]_[variable]_[yyyy]-[mm]-[dd].csv. The date component refers to the date of data download here and elsewhere is this document.

2. ”FRA_Years_variables”, most of the reported data are found in this folder and typically, the data are structured by separate file for each variable. Each file typically has separate columns for the FRA reporting years: ${years}. Files are named according to convention [Section][SubSection]_[variable]_[yyyy]-[mm]-[dd].csv

3. “Intervals_variables” -folder contains separate files for annual average change data on Forest expansion, Afforestation, Natural expansion, Deforestation and Reforestation. Each data record contains information for one country and intervals ${yearRange}. Each file is named according to convention [Section][SubSection]_[variable]_[yyyy]-[mm]-[dd].csv.

In addition to the sub-folders the bulk download contains a number of files:

File “Annual_[yyyy]-[mm]-[dd].csv” contain data in one Excel worksheet for all variables in the folder “Annual_variables”. In addition, this file contains observations status codes (“flags”) for each data point. Flag descriptions are found in column U.

File “DegradedForest_[yyyy]-[mm]-[dd].csv” contains descriptive data reported on degraded forest reporting.

File “ForestPolicy_[yyyy]-[mm]-[dd].csv” contain descriptive data reported on forest policy.

File “ForestRestoration_[yyyy]-[mm]-[dd].csv ” contain descriptive data reported on forest restoration

File “FRA_years_[yyyy]-[mm]-[dd].csv” contain data in one Excel worksheet for all variables in the folder “FRA_Years_variables”. In addition, this file contains “flags” for each data point, flag descriptions are found in column IA.

File “Intervals_[yyyy]-[mm]-[dd].csv ” contain data in one Excel worksheet for all variables in the folder “Intervals_variables”. In addition, this file contains “flags” for each data point, flag descriptions are found in column Q.

File “NDPYear_[yyyy]-[mm]-[dd].csv” contain data on the earliest and latest year of “National Data Point” used by countries/areas using the national data point approach for reporting on forest area.

File “NWFP_[yyyy]-[mm]-[dd].csv” contain data on the top 10 Non Wood Forest Products (NWFP) reported by: name, value in 1000 local currency, NWFP categories (for more information on the different categories please see the FRA platform for table 7)

File “Tiers_[yyyy]-[mm]-[dd].csv” contain information on Tiers reported for table 1a Forest area (status and trend), 2a Growing stock (status) and 2c Biomass (status). For more information on the criteria for the different tiers please see FRA platform Tier criteria sections 1a, 2a and 2c.

The reporting units can be found in each of the files or at the FRA platform.

Required citation: [FAO. Year of the download. Global Forest Resources Assessment. URL. Accessed on: date-of-the-download]

Contact: fra@fao.org`
}
