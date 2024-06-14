import { Router } from 'express'
import authRouter from './users/auth-router'
import songRouter from './songs/song-router'
import playlistRouter from './playlist/playlist-router'

const globalRouter = Router()

globalRouter.use('/u', authRouter)
globalRouter.use('/s', songRouter)
globalRouter.use('/p', playlistRouter)

export default globalRouter
