import { createRoute } from './createRoute'
import { AssessmentRouteParams, CountryRouteParams, CycleRouteParams, SectionRouteParams } from './params'
import { Route } from './route'

const Root: Route<undefined, undefined> = { path: '/', parts: [], generatePath: () => `/` }
const Assessment = createRoute<AssessmentRouteParams>({ path: 'assessments/:assessmentName', parent: Root })
const Cycle = createRoute<CycleRouteParams>({ path: ':cycleName', parent: Assessment })

// Cycle routes and sub routes
const Admin = createRoute<CountryRouteParams>({ path: 'admin', parent: Cycle })
const AdminUserManagement = createRoute<CountryRouteParams>({ path: 'userManagement', parent: Admin })

// Country routes and sub routes
const Country = createRoute<CountryRouteParams>({ path: ':countryIso', parent: Cycle })
const CountryDataDownload = createRoute<CountryRouteParams>({ path: 'data-download', parent: Country })
const CountryHome = createRoute<CountryRouteParams>({ path: 'home', parent: Country })
const CountryUser = createRoute<CountryRouteParams>({ path: 'users/:id', parent: Country })
const OriginalDataPoint = createRoute<SectionRouteParams>({
  path: 'originalDataPoints/:year/:sectionName',
  parent: Country,
})
const Section = createRoute<SectionRouteParams>({ path: 'sections/:sectionName', parent: Country })

// Login routes and sub routes
const Login = createRoute<CountryRouteParams>({ path: 'login', parent: Cycle })
const LoginInvitation = createRoute<CountryRouteParams>({ path: 'invitation', parent: Login })
const LoginResetPassword = createRoute<CountryRouteParams>({ path: 'resetPassword', parent: Login })

export const Routes = {
  Root,
  Assessment,

  // cycle
  Cycle,
  Admin,
  AdminUserManagement,

  // country
  Country,
  CountryDataDownload,
  CountryHome,
  CountryUser,
  OriginalDataPoint,
  Section,

  // login
  Login,
  LoginInvitation,
  LoginResetPassword,
}
