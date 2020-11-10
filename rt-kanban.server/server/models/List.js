import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const List = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, required: true },
    board: { type: ObjectId, ref: 'Board', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

List.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default List
