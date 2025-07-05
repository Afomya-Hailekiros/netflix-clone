// lib/models/user.ts
import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  image: String,
  favorites: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
})

export const User = mongoose.models.User || mongoose.model("User", UserSchema)
