import { createRoute } from './createRoute'
import {
  AssessmentRouteParams,
  CountryHomeRouteParams,
  CountryRouteParams,
  CountryUserRouteParams,
  CycleRouteParams,
  SectionRouteParams,
} from './params'
import { Root } from './root'

const Assessment = createRoute<AssessmentRouteParams>({ path: 'assessments/:assessmentName', parent: Root })

// Cycle routes and sub routes
const Cycle = createRoute<CycleRouteParams>({ path: ':cycleName', parent: Assessment })
const Admin = createRoute<CycleRouteParams>({ path: 'admin', parent: Cycle })
const AdminUserManagement = createRoute<CycleRouteParams>({ path: 'userManagement', parent: Admin })
const Tutorials = createRoute<CycleRouteParams>({ path: 'tutorials', parent: Cycle })

// Country routes and sub routes
const Country = createRoute<CountryRouteParams>({ path: ':countryIso', parent: Cycle })
const CountryDataDownload = createRoute<CountryRouteParams>({ path: 'data-download', parent: Country })
const CountryHome = createRoute<CountryRouteParams>({ path: 'home', parent: Country })
const CountryHomeSection = createRoute<CountryHomeRouteParams>({ path: ':sectionName', parent: CountryHome })
const CountryUser = createRoute<CountryUserRouteParams>({ path: 'users/:id', parent: Country })
const Geo = createRoute<CountryRouteParams>({ path: 'geo', parent: Country })
const OriginalDataPoint = createRoute<SectionRouteParams>({
  path: 'originalDataPoints/:year/:sectionName',
  parent: Country,
})
const Section = createRoute<SectionRouteParams>({ path: 'sections/:sectionName', parent: Country })
const Print = createRoute<CountryRouteParams>({ path: 'print', parent: Country })

// Login routes and sub routes
const Login = createRoute<CycleRouteParams>({ path: 'login', parent: Cycle })
const LoginInvitation = createRoute<CycleRouteParams>({ path: 'invitation', parent: Login })
const LoginResetPassword = createRoute<CycleRouteParams>({ path: 'resetPassword', parent: Login })

export const Routes = {
  Root,
  Assessment,

  // cycle
  Cycle,
  Admin,
  AdminUserManagement,
  Tutorials,

  // country
  Country,
  CountryDataDownload,
  CountryHome,
  CountryHomeSection,
  CountryUser,
  Geo,
  OriginalDataPoint,
  Section,
  Print,

  // login
  Login,
  LoginInvitation,
  LoginResetPassword,
}
