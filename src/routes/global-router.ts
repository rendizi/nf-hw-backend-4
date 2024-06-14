import { Router } from 'express'
import authRouter from './users/auth-router'
// other routers can be imported here

const globalRouter = Router()

globalRouter.use('/users', authRouter)

export default globalRouter
