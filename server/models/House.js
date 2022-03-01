import mongoose from "mongoose"
const Schema = mongoose.Schema

export const HouseSchema = new Schema(
  {

    price: { type: Number, required: true },
    color: { type: String, required: true },
    year: { type: Number, required: true, min: 1901 },
    floors: { type: String, required: true },
    description: { type: String },
    imgUrl: { type: String, default: 'https://placehold.id/200x200' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)