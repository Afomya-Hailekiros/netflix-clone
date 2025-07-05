// lib/mongoose.ts
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env.local file")
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

if (!globalThis._mongoose) {
  cached = { conn: null, promise: null };
  globalThis._mongoose = cached;
} else {
  cached = globalThis._mongoose;
}

async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
