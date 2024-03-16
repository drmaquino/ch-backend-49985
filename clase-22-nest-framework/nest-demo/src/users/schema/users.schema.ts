import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Model } from 'mongoose'

@Schema({
  strict: 'throw',
  versionKey: false,
  methods: {

  }
})
class User {
  @Prop({ required: true })
  _id: string

  @Prop({ required: true })
  nombre: string

  @Prop({ required: true })
  apellido: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string
}

export const UsersSchema = SchemaFactory.createForClass(User)
export const schemaName = User.name
export type UsersDoc = HydratedDocument<User>
export type UsersRepository = Model<UsersDoc>