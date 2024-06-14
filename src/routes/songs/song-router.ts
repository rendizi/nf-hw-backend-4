import { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth-middleware'
import SongController from './song-controller';
import SongService from './song-service';
import multer from 'multer';

const songRouter = Router()

const songService = new SongService()
const songController = new SongController(songService)

const upload = multer({ dest: 'songs-baglanov/' });

songRouter.post('/publish',
    upload.fields([{ name: 'songPreview', maxCount: 1 }, { name: 'song', maxCount: 1 }])
    ,songController.publishSong)

songRouter.get('/s/:id', songController.getSong)
songRouter.delete('/:id', songController.deleteSong)
songRouter.put('/:id', upload.single('songPreview'), songController.updateSong)
songRouter.get('/search', songController.getSongs)


export default songRouter
