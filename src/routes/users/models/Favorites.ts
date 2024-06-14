import mongoose, { Document, Schema } from 'mongoose';

export interface IFavorites extends Document {
  userId: string;
  songId: string;
}

const FavoritesSchema: Schema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'SpotifyUser', required: true},
  songId: {type: Schema.Types.ObjectId, ref: 'SpotifySong', required: true}
});

export default mongoose.model<IFavorites>('SpotifyFavorites', FavoritesSchema);
