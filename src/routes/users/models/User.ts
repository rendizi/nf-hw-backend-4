import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  songs: string[];
  bio: string;
  profileImage: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: 'Bahauddin top' }, 
  profileImage: { type: String, default: '' } ,
});

export default mongoose.model<IUser>('SpotifyUser', UserSchema);
