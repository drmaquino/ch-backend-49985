import cookieParser from 'cookie-parser'
import { COOKIE_SECRET } from '../config/config.js'

export const cookies = cookieParser(COOKIE_SECRET)