import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../config/config.js'

import { BusinessDao } from './business.dao.js'
import { OrdersDao } from './orders.dao.js'
import { UsersDao } from './users.dao.js'

await mongoose.connect(MONGODB_CNX_STR)

export const businessDao = new BusinessDao()
export const ordersDao = new OrdersDao()
export const usersDao = new UsersDao()
