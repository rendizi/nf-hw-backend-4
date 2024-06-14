import mongoose, { Document, Schema } from 'mongoose';

export interface IFavorites extends Document {
  userId: string;
  songId: string;
}

const FavoritesSchema: Schema = new Schema({
  userId: { type: String, required: true},
  songid: {type: String, required: true}
});

export default mongoose.model<IFavorites>('SpotifyFavorites', FavoritesSchema);
