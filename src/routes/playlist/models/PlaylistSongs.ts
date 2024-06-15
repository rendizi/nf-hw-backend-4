import mongoose, { Document, Schema } from 'mongoose';

export interface IPlaylistSongs extends Document {
  playlistId: string 
  songId: string 
}

const PlaylistSongsSchema: Schema = new Schema({
    playlistId: {type: Schema.Types.ObjectId, ref: 'SpotifyPlaylist', required: true},
    songId: {type: Schema.Types.ObjectId, ref: 'SpotifySong', required: true},
  });

export default mongoose.model<IPlaylistSongs>('SpotifyPlaylistSongs', PlaylistSongsSchema);
