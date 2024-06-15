import { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth-middleware'
import PlaylistService from './playlist-service'
import PlaylistController from './playlist-controller'

const playlistRouter = Router()

const playlistService = new PlaylistService()
const playlistController = new PlaylistController(playlistService)

playlistRouter.post('/create', authMiddleware, playlistController.createPlaylist)
playlistRouter.post('/add', authMiddleware, playlistController.addMusic )
playlistRouter.delete('/', authMiddleware, playlistController.removePlaylist)
playlistRouter.delete('/song', authMiddleware, playlistController.removeSong)
playlistRouter.get('/song/:id', playlistController.get)
playlistRouter.get('/p/', playlistController.getPlaylists)


export default playlistRouter
