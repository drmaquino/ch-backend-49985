export function createMockUserDataWithout(...fields) {
  const userData = {
    username: 'username',
    password: 'password',
    email: 'email',
    fullName: 'pepe',
  }

  for (const field of fields) {
    delete userData[field]
  }

  return userData
}
