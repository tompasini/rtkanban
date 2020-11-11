import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Comment = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, required: true },
    task: { type: ObjectId, ref: 'Task', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Comment.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Comment
