import { combineReducers } from 'redux'

import { ApplicationSlice } from 'client/store/application/slice'
import { AreaSlice } from 'client/store/area/slice'
import { ContactsSlice } from 'client/store/data/contacts/slice'
import { DescriptionsSlice } from 'client/store/data/descriptions/slice'
import { HistorySlice } from 'client/store/data/history/slice'
import { LinkedDataSourcesSlice } from 'client/store/data/linkedDataSources/slice'
import { OriginalDataPointSlice } from 'client/store/data/originalDataPoint/slice'
import { EstimationsSlice } from 'client/store/data/tableData/estimations/slice'
import { NodeValuesSlice } from 'client/store/data/tableData/nodeValues/slice'
import { ValidationsReducer } from 'client/store/data/tableData/validations/slice'
import { DataExportSlice } from 'client/store/dataExport/slice'
import { ExplorerDataSlice } from 'client/store/explorer/data/slice'
import { ExplorerMetadataSlice } from 'client/store/explorer/metadata/slice'
import { ExplorerSelectionSlice } from 'client/store/explorer/selection/slice'
import { FileUploadSlice } from 'client/store/fileUpload/slice'
import { MessageCenterSlice } from 'client/store/messageCenter/slice'
import { MetaSlice } from 'client/store/meta/slice'
import { RepositorySlice } from 'client/store/repository/slice'
import { ReviewSlice } from 'client/store/review/slice'
import { AreaSelectorSlice } from 'client/store/ui/areaSelector/slice'
import { CountryReportSlice } from 'client/store/ui/countryReport/slice'
import GeoSlice from 'client/store/ui/geo/slice'
import { NotificationSlice } from 'client/store/ui/notification/slice'
import { UserSlice } from 'client/store/user/slice'

export default {
  [ApplicationSlice.name]: ApplicationSlice.reducer,
  [AreaSlice.name]: AreaSlice.reducer,
  data: combineReducers({
    [ContactsSlice.name]: ContactsSlice.reducer,
    [DescriptionsSlice.name]: DescriptionsSlice.reducer,
    [HistorySlice.name]: HistorySlice.reducer,
    [LinkedDataSourcesSlice.name]: LinkedDataSourcesSlice.reducer,
    [OriginalDataPointSlice.name]: OriginalDataPointSlice.reducer,
    tableData: combineReducers({
      [EstimationsSlice.name]: EstimationsSlice.reducer,
      [NodeValuesSlice.name]: NodeValuesSlice.reducer,
      [ValidationsReducer.name]: ValidationsReducer.reducer,
    }),
  }),
  explorer: combineReducers({
    [ExplorerDataSlice.name]: ExplorerDataSlice.reducer,
    [ExplorerSelectionSlice.name]: ExplorerSelectionSlice.reducer,
    [ExplorerMetadataSlice.name]: ExplorerMetadataSlice.reducer,
  }),
  [DataExportSlice.name]: DataExportSlice.reducer,
  [FileUploadSlice.name]: FileUploadSlice.reducer,
  [MetaSlice.name]: MetaSlice.reducer,
  [MessageCenterSlice.name]: MessageCenterSlice.reducer,
  [RepositorySlice.name]: RepositorySlice.reducer,
  [ReviewSlice.name]: ReviewSlice.reducer,

  geo: GeoSlice,
  ui: combineReducers({
    [AreaSelectorSlice.name]: AreaSelectorSlice.reducer,
    [CountryReportSlice.name]: CountryReportSlice.reducer,
    [NotificationSlice.name]: NotificationSlice.reducer,
  }),
  [UserSlice.name]: UserSlice.reducer,
}
