import mongoose, { Document, Schema } from 'mongoose';

export interface IPlaylist extends Document {
  title: string 
  author: string 
  image: string 
  description: string 
}

const PlaylistSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: {type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref: 'SpotifyUser', required: true }, 
    image: { type: String, default: "https://nf-2024.s3.eu-north-1.amazonaws.com/profileImages/hjiaewrbfhbhjiaewfrbjire.png" },
  });

export default mongoose.model<IPlaylist>('SpotifyPlaylist', PlaylistSchema);
