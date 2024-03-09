import assert from 'node:assert'

import { User } from '../../src/models/User.js'
import { createMockUserDataWithout } from '../utils/test-utils.js'

describe('User Model', function () {
  it('tira error si no tiene username', function () {
    assert.throws(() => {
      // @ts-ignore
      new User(createMockUserDataWithout('username'))
    })
  })
  it('tira error si no tiene password', function () {
    assert.throws(() => {
      // @ts-ignore
      new User(createMockUserDataWithout('password'))
    })
  })
  it('tira error si no tiene email', function () {
    assert.throws(() => {
      // @ts-ignore
      new User(createMockUserDataWithout('email'))

    })
  })
  it('tira error si no tiene fullName', function () {
    assert.throws(() => {
      // @ts-ignore
      new User(createMockUserDataWithout('fullName'))
    })
  })
})
