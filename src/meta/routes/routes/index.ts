import {
  Admin,
  AdminCollaborators,
  AdminCountries,
  AdminInvitations,
  AdminLinks,
} from 'meta/routes/routes/_routes/admin'
import { Assessment } from 'meta/routes/routes/_routes/assessment'
import {
  Country,
  CountryDataDownload,
  CountryHome,
  CountryHomeSection,
  CountryHomeSectionInvite,
  CountryUser,
} from 'meta/routes/routes/_routes/country'
import { Cycle } from 'meta/routes/routes/_routes/cycle'
import { Geo } from 'meta/routes/routes/_routes/geo'
import {
  ExploringOurForests,
  ForestKids,
  FraDataPlatform,
  FraProcess,
  HiddenInPlainSight,
  InteractiveStories,
  Kiosk,
  RecentHighlights,
  RemoteSensingSurvey,
  TheSecretsOfMangroves,
  WatchingOverOurForests,
} from 'meta/routes/routes/_routes/kiosk'
import {
  Login,
  LoginChangePassword,
  LoginInvitation,
  LoginInvitationAccept,
  LoginInvitationLocal,
  LoginResetPassword,
} from 'meta/routes/routes/_routes/login'
import { OriginalDataPoint } from 'meta/routes/routes/_routes/originalDataPoint'
import { Print, PrintTables } from 'meta/routes/routes/_routes/print'
import { Section } from 'meta/routes/routes/_routes/section'
import { Tutorials } from 'meta/routes/routes/_routes/tutorials'
import { Root } from 'meta/routes/routes/root'

export const Routes = {
  Root,
  Assessment,

  // cycle
  Cycle,
  Admin,
  AdminCountries,
  AdminInvitations,
  AdminLinks,
  AdminCollaborators,
  Tutorials,

  // country
  Country,
  CountryDataDownload,
  CountryHome,
  CountryHomeSection,
  CountryHomeSectionInvite,
  CountryUser,
  Geo,
  OriginalDataPoint,
  Section,
  Print,
  PrintTables,

  // login
  Login,
  LoginChangePassword,
  LoginInvitation,
  LoginInvitationAccept,
  LoginInvitationLocal,
  LoginResetPassword,

  // kiosk
  Kiosk,
  ForestKids,
  FraDataPlatform,
  FraProcess,
  RemoteSensingSurvey,
  RecentHighlights,
  InteractiveStories,
  WatchingOverOurForests,
  ExploringOurForests,
  HiddenInPlainSight,
  TheSecretsOfMangroves,
}
