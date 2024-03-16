import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity.js'
import { randomUUID } from 'crypto'
import { UsersRepository, schemaName } from './schema/users.schema.js'
import { InjectModel } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(schemaName)
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = new User({
      _id: randomUUID(),
      ...createUserDto,
    })

    await this.usersRepository.create(user.toPojo())

    return user.toPojo()
  }

  async findAll() {
    if (this.configService.get('MODE') === 'development') {
      console.log('desarrollando a pleno!!')
    }
    const userDocs = await this.usersRepository.find()
    return userDocs.map(u => new User(u).toPojo())
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
