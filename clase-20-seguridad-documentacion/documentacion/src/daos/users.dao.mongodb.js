import { userSchema } from '../schemas/user.schema.js'
import { MongooseDao } from './dao.mongose.js'

const mongooseSchemaConfig = {
  versionKey: false,
  strict: 'throw',
  methods: {
    toPojo: () => {
      return JSON.parse(JSON.stringify(this))
    }
  }
}

export const collName = 'users'

export const usersDao = new MongooseDao(collName, userSchema, mongooseSchemaConfig)
