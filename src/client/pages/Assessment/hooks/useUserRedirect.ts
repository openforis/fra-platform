import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { isAnyOf } from '@reduxjs/toolkit'

import { AssessmentNames } from 'meta/assessment'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAppDispatch } from 'client/store'
import { useAssessment, useAssessments, useCycle, useIsAppInitialized } from 'client/store/assessment'
import { LoginActions } from 'client/store/login'
import { addAppListener } from 'client/store/middleware/listener'
import { useUser } from 'client/store/user'

const useLoginListener = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const _user = useUser()
  const assessments = useAssessments()

  useEffect(() => {
    const unsubscribe = dispatch(
      addAppListener({
        matcher: isAnyOf(LoginActions.localLogin.fulfilled, LoginActions.acceptInvitation.fulfilled),
        effect: (action) => {
          const user = action.payload ?? _user
          const userLastRole = UserRoles.getLastRole({ user })

          const assessment = assessments.find((assessment) => Number(assessment.id) === userLastRole?.assessmentId)
          const cycle = assessment?.cycles.find((cycle) => cycle.uuid === userLastRole?.cycleUuid)
          const assessmentName = assessment?.props.name
          const cycleName = cycle?.name

          const countryIso = userLastRole?.countryIso

          const params = { assessmentName, cycleName, countryIso, id: user.id }

          navigate(Routes.CountryHome.generatePath(params))
        },
      })
    )
    return unsubscribe
  }, [_user, assessments, dispatch, navigate])
}

export const useUserRedirect = (): void => {
  const isAppInitialized = useIsAppInitialized()
  const assessment = useAssessment()
  const user = useUser()
  const userLastRole = UserRoles.getLastRole({ assessment, user })
  const cycle = useCycle(userLastRole?.cycleUuid)
  const countryIso = userLastRole?.countryIso
  const navigate = useNavigate()
  useLoginListener()

  const assessmentName = assessment?.props.name
  const cycleName = cycle?.name

  useEffect(() => {
    const personalInfoRequired = Users.isPersonalInfoRequired(user, userLastRole)
    const isFra = assessmentName === AssessmentNames.fra
    const shouldRedirectToProfile = Boolean(
      isAppInitialized && personalInfoRequired && assessment && cycle && navigate && isFra
    )

    if (shouldRedirectToProfile) {
      const params = { assessmentName, cycleName, countryIso, id: user.id }
      const routeParams = { assessmentName, cycleName, countryIso }
      const state = { userLastRole, personalInfoRequired, routeParams }
      navigate(Routes.CountryUser.generatePath(params), { state })
    }
  }, [assessment, assessmentName, countryIso, cycle, cycleName, isAppInitialized, navigate, user, userLastRole])
}
