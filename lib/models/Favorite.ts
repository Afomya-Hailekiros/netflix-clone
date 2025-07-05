import mongoose from "mongoose"

const FavoriteSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
}, { timestamps: true })

export default mongoose.models.Favorite || mongoose.model("Favorite", FavoriteSchema)
