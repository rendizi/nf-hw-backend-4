import dotenv from "dotenv"
import { CreatePlaylistDto } from "./dtos/createPlaylist.dto";
import Playlist from "./models/Playlist";
import PlaylistSongs from "./models/PlaylistSongs";
import Song from "../songs/models/Song"

dotenv.config();

class PlaylistService{
    async createPlaylist(CreatePlaylistDto: CreatePlaylistDto){
        const {title, description, author} = CreatePlaylistDto;
        
        const newPlaylist = new Playlist({
            title,
            description,
            author 
        })

        await newPlaylist.save()
        return newPlaylist
    }

    async addSong(playlistId: string, songId: string, userId: string){
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            throw new Error("Playlist not found");
        }

        if (playlist.author.toString() !== userId) {
            throw new Error("you dont have enough permissiins");
        }

        const newPlaylistSong = new PlaylistSongs({
            playlistId,
            songId
        });

        await newPlaylistSong.save();
    
        const song = await Song.findById(songId);
        
        if (!song) {
            throw new Error("Song not found");
        }

        playlist.image = song.image;
        await playlist.save();
    
        return newPlaylistSong;
    }
    

    async removeSong(playlistId: string, songId: string, userId: string) {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            throw new Error("Playlist not found");
        }

        if (playlist.author.toString() !== userId) {
            throw new Error("you dont have enough permissiins");
        }

        await PlaylistSongs.findOneAndDelete({ playlistId, songId });
        
        playlist.image = "https://nf-2024.s3.eu-north-1.amazonaws.com/profileImages/hjiaewrbfhbhjiaewfrbjire.png";
        await playlist.save();
        
    }
    

    async removePlaylist(playlistId: string, userId: string){
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            throw new Error("not found");
        }

        if (playlist.author.toString() !== userId) {
            throw new Error("you dont have enough permissiins");
        }

        await Playlist.findOneAndDelete({ _id: playlistId });
    }

    async getPlaylistWithSongs(playlistId: string, page: number, limit: number) {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            throw new Error("Playlist not found");
        }
    
        const playlistSongs = await PlaylistSongs.find({ playlistId: playlistId })
            .populate('songId')
            .limit(limit)
            .skip((page - 1) * limit);
    
        const songs = playlistSongs.map(ps => ps.songId);
    
        return {
            ...playlist.toObject(),
            songs: songs
        };
    }

    async getPlaylists(page: number, limit: number){
        const playlists = await Playlist.find().limit(limit).skip((page-1)*limit).exec()
        if (!playlists){
            throw new Error("not found")
        }
        return playlists
    }
    
}

export default PlaylistService
