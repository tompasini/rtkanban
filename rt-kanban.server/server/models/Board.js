import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Board = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Board.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Board
