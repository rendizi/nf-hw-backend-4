import { Request, Response } from 'express'

import PlaylistService from "./playlist-service";


class PlaylistController{
    private playlistService: PlaylistService
    constructor(playlistService: PlaylistService) {
        this.playlistService = playlistService
      }
    
    
      createPlaylist = async(req: Request, res: Response) => {
        try{
        const author = (req as any).username 
        if (!author) {
            res.status(400).send({ message: "username is not provided" });
            return;
          }
        const {title, description} = req.body 
        const playlist = await this.playlistService.createPlaylist({title, author, description})
        res.status(200).send(playlist)}
        catch (err){
            res.status(400).send({message:`${err}`})
        }
      }

      addMusic = async(req: Request, res: Response) => {
        try{
            const author = (req as any)._id 
            if (!author){
                res.status(400).send({ message: "id is not provided" });
                return;
            }
            const {songId, playlistId} = req.body 
            const resp = await this.playlistService.addSong(playlistId, songId, author)
            return resp 
        }catch (err){
            res.status(400).send({message:`${err}`})
        }
      }

      removeSong = async(req: Request, res: Response) => {
        try{
            const author = (req as any)._id 
            if (!author){
                res.status(400).send({ message: "id is not provided" });
                return;
            }
            const {songId, playlistId} = req.body 
            const resp = await this.playlistService.removeSong(playlistId, songId, author)
            return resp 
        }catch (err){
            res.status(400).send({message:`${err}`})
        }
      }

      removePlaylist = async(req: Request, res: Response) => {
        try{
            const author = (req as any)._id 
            if (!author){
                res.status(400).send({ message: "id is not provided" });
                return;
            }
            const {playlistId} = req.body 
            const resp = await this.playlistService.removePlaylist(playlistId, author)
            return resp 
        }catch (err){
            res.status(400).send({message:`${err}`})
        }
      }

      get = async(req: Request, res: Response) => {
        try{
            let { page, limit } = req.query;

            const playlistId = req.params.id as string 
    
            page = page ? String(page) : '1';
            limit = limit ? String(limit) : '6';

            const parsedPage = parseInt(page, 10);
            const parsedLimit = parseInt(limit, 10);

            const resp = await this.playlistService.getPlaylistWithSongs(playlistId, parsedPage, parsedLimit)
            res.status(200).send(resp)
        }catch (err){
            res.status(400).send({message:`${err}`})
        }
      }

      getPlaylists = async(req: Request, res: Response) => {
        try{
            let { page, limit } = req.query;
    
            page = page ? String(page) : '1';
            limit = limit ? String(limit) : '6';

            const parsedPage = parseInt(page, 10);
            const parsedLimit = parseInt(limit, 10);

            const resp = await this.playlistService.getPlaylists(parsedPage, parsedLimit)
            res.status(200).send(resp)
        }catch (err){
            res.status(400).send({message:`${err}`})
        }
      }
}

export default PlaylistController