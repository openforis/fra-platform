import { combineReducers } from 'redux'

import { ApplicationSlice } from 'client/store/application/slice'
import { AreaSlice } from 'client/store/area/slice'
import { DataSliceName } from 'client/store/data/name'
import { dataReducer } from 'client/store/data/reducer'
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
import { NotificationSlice } from 'client/store/ui/notification/slice'
import { UserSlice } from 'client/store/user/slice'

export default {
  [ApplicationSlice.name]: ApplicationSlice.reducer,
  [AreaSlice.name]: AreaSlice.reducer,
  [DataSliceName]: dataReducer,
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

  ui: combineReducers({
    [AreaSelectorSlice.name]: AreaSelectorSlice.reducer,
    [CountryReportSlice.name]: CountryReportSlice.reducer,
    [NotificationSlice.name]: NotificationSlice.reducer,
  }),
  [UserSlice.name]: UserSlice.reducer,
}
