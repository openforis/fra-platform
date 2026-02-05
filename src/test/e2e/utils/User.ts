export type TestUserData = {
  email: string
  fullName: string
  name: string
  role: string
  surname: string
}

const createTestUser = (role: string): TestUserData => {
  const timestamp = Date.now()
  const name = `Test${timestamp}`
  const surname = role

  const email = `${name.toLowerCase()}.${surname.toLowerCase().replaceAll(' ', '-')}@fra-test.com`
  const fullName = `${name} ${surname}`

  return { name, surname, email, fullName, role }
}

export const UserUtils = {
  createTestUser,
}
