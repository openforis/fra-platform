export interface LoginState {
  changePassword?: {
    error?: string
    message?: string
  }
  login: {
    status?: string
    invitation?: string
    user: {
      type: string
      email: string
      password: string
    }
  }
  localLogin: {
    message?: string
    resetPassword?: {
      message?: string
      error?: string
    }
  }
  resetPassword?: {
    uuid?: string
    status?: string
    data?: {
      user?: {
        email?: string
        id?: string
      }
    }
  }
}
