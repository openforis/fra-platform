// at least 6 chars, 1 lower case, 1 upper case and 1 number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/
export const validPassword = (password: any) => passwordRegex.test(password)
