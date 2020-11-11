import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Task = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, required: true },
    list: { type: ObjectId, ref: 'List', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Task
