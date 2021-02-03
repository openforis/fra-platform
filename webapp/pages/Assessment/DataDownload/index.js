import './dataDownload.less'
import React from 'react'

import { useI18n } from '../../../components/hooks'
import Icon from '../../../components/icon'

const resources = [
  {
    idx: 1,
    name: 'Forest_extent_characteristics_and_changes',
    labelKey: 'navigation.sectionHeaders.forestExtentCharacteristicsAndChanges',
  },
  {
    idx: 2,
    name: 'Forest_growing_stock_biomass_and_carbon',
    labelKey: 'navigation.sectionHeaders.forestGrowingStockBiomassAndCarbon',
  },
  {
    idx: 3,
    name: 'Forest_designation_and_management',
    labelKey: 'navigation.sectionHeaders.forestDesignationAndManagement',
  },
  {
    idx: 4,
    name: 'Forest_ownership_and_management_rights',
    labelKey: 'navigation.sectionHeaders.forestOwnershipAndManagementRights',
  },
  { idx: 6, name: 'Permanent_forest_estate', labelKey: 'areaOfPermanentForestEstate.areaOfPermanentForestEstate' },
]

const DataDownload = () => {
  const i18n = useI18n()

  return (
    <div className="app-view__content">
      <div className="landing__page-header">
        <h1 className="landing__page-title"> {i18n.t('dataDownload.dataDownload')}</h1>
      </div>

      <div className="data-download">
        <div>{i18n.t('dataDownload.bulkDownload')}</div>
        <a className="btn-s btn-primary nav__bulk-download" href="/api/export/bulk-download" alt="">
          <Icon className="icon-sub icon-white" name="hit-down" />
          ZIP
        </a>

        {resources.map((resource, idx) => (
          <React.Fragment key={String(idx)}>
            <div className="data-download__sep" />
            <div>
              {`${resource.idx}. `}
              {i18n.t(resource.labelKey)}
            </div>
            <a
              className="btn-s btn-primary nav__bulk-download"
              href={`/api/fileRepository/dataDownload/${`${resource.idx}_${resource.name}`}/ods`}
              alt=""
            >
              <Icon className="icon-sub icon-white" name="hit-down" />
              ODS
            </a>
            <a
              className="btn-s btn-primary nav__bulk-download"
              href={`/api/fileRepository/dataDownload/${`${resource.idx}_${resource.name}`}/xlsx`}
              alt=""
            >
              <Icon className="icon-sub icon-white" name="hit-down" />
              XLS
            </a>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default DataDownload
