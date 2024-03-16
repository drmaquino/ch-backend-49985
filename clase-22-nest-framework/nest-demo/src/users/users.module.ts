import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersSchema, schemaName } from './schema/users.schema.js'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: schemaName, schema: UsersSchema }
    ]),
    ConfigModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
