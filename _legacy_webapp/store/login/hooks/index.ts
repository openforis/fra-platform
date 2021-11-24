import { useAppSelector } from '../../../store'

export const useResetPassword = () => useAppSelector((state) => state.login.localLogin?.resetPassword || {})
export const useLocalLoginMessage = () => useAppSelector((state) => state.login.localLogin.message)
export const useResetPasswordFormState = () =>
  useAppSelector((state) => {
    return {
      status: state.login.resetPassword.status,
      resetPassword: state.login.resetPassword.data,
      changePasswordResponse: state.login.changePassword,
    }
  })
