import { combineReducers } from 'redux'

import { ApplicationSlice } from 'client/store/application/slice'
import { AreaSlice } from 'client/store/area/slice'
import { ContactsSlice } from 'client/store/data/contacts/slice'
import { DescriptionsSlice } from 'client/store/data/descriptions/slice'
import { HistorySlice } from 'client/store/data/history/slice'
import { LinkedDataSourcesSlice } from 'client/store/data/linkedDataSources/slice'
import { EstimationsSlice } from 'client/store/data/tableData/estimations/slice'
import { NodeValuesSlice } from 'client/store/data/tableData/nodeValues/slice'
import { TableDataStatusSlice } from 'client/store/data/tableData/status/slice'
import { ValidationsReducer } from 'client/store/data/tableData/validations/slice'
import { DataExportSlice } from 'client/store/dataExport/slice'
import { MetaSlice } from 'client/store/meta/slice'
import { FileUploadSlice } from 'client/store/ui/fileUpload'
import { LinksSlice } from 'client/store/ui/links'
import { RepositorySlice } from 'client/store/ui/repository'
import { UserSlice } from 'client/store/user/slice'

import { OriginalDataPointSlice } from './data/originalDataPoint/slice'
import { AreaSelectorSlice } from './ui/areaSelector'
import { AssessmentSectionSlice } from './ui/assessmentSection/slice'
import DataLockSlice from './ui/dataLock/slice'
import GeoSlice from './ui/geo/slice'
import HomeSlice from './ui/home/slice'
import MessageCenterSlice from './ui/messageCenter/slice'
import NavigationSlice from './ui/navigation/slice'
import NotificationSlice from './ui/notification/slice'
import ReviewSlice from './ui/review/slice'
import UserManagementSlice from './ui/userManagement/slice'

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
      [TableDataStatusSlice.name]: TableDataStatusSlice.reducer,
      [ValidationsReducer.name]: ValidationsReducer.reducer,
    }),
  }),
  [DataExportSlice.name]: DataExportSlice.reducer,
  [MetaSlice.name]: MetaSlice.reducer,
  geo: GeoSlice,
  ui: combineReducers({
    [AreaSelectorSlice.name]: AreaSelectorSlice.reducer,
    [AssessmentSectionSlice.name]: AssessmentSectionSlice.reducer,
    dataLock: DataLockSlice,
    [FileUploadSlice.name]: FileUploadSlice.reducer,
    home: HomeSlice,
    [LinksSlice.name]: LinksSlice.reducer,
    messageCenter: MessageCenterSlice,
    navigation: NavigationSlice,
    notification: NotificationSlice,
    [RepositorySlice.name]: RepositorySlice.reducer,
    review: ReviewSlice,
    userManagement: UserManagementSlice,
  }),
  [UserSlice.name]: UserSlice.reducer,
}
