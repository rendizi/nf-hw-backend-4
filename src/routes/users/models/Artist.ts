import mongoose, { Document, Schema } from 'mongoose';

export interface IArtist extends Document {
  username: string;
  password: string;
  songs: string[];
  bio: string;
  profileImage: string;
}

const ArtistSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: 'Bahauddin top' }, 
  profileImage: { type: String, default: 'https://nf-2024.s3.eu-north-1.amazonaws.com/profileImages/hjiaewrbfhbhjiaewfrbjire.png' } ,
});

export default mongoose.model<IArtist>('SpotifyArtist', ArtistSchema);
