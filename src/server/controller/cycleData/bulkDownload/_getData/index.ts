import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Assessments } from 'meta/assessment/assessments'

import {
  BulkDownloadData,
  BulkDownloadMetadata,
  PropsBulkDownload,
} from 'server/controller/cycleData/bulkDownload/types'

import { _getCycleCountries } from './_getCycleCountries'
import { _getDescriptions } from './_getDescriptions'
import { _getNames } from './_getNames'
import { _getODPData } from './_getODPData'
import { _getTableData } from './_getTableData'

type Props = PropsBulkDownload & { countries: Array<Country>; metadata: BulkDownloadMetadata }

export const getData = async (props: Props): Promise<BulkDownloadData> => {
  const { assessment, countries, cycle, metadata } = props
  const countryISOs = countries.map<CountryIso>((country) => country.countryIso)
  const { sectionNames, tableNames } = _getNames({ metadata })

  const lastPublishedCycle = Assessments.getLastPublishedCycle(assessment)
  const isLastPublishedCycle = lastPublishedCycle?.uuid === cycle.uuid

  // When exporting from the last published cycle, group countries by their last published cycle
  // to include voluntary updates from non-published cycles
  const cycleCountries = isLastPublishedCycle
    ? await _getCycleCountries({ assessment, countryISOs, cycle: lastPublishedCycle })
    : undefined

  const [tables, descriptions, odp] = await Promise.all([
    _getTableData({ assessment, countryISOs, cycle, isLastPublishedCycle, tableNames }),
    _getDescriptions({ assessment, countryISOs, cycle, cycleCountries, sectionNames }),
    _getODPData({ assessment, countryISOs, cycle, cycleCountries }),
  ])

  return { descriptions, odp, tables }
}
