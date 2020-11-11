import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentService {
  async delete(commentId, userId) {
    const exists = await this.findById(commentId, userId)
    if (!exists) { throw new BadRequest('Not a valid id') }
    const poster = exists._doc.creatorId

    if (poster !== userId) {
      throw new BadRequest('You are not the creator of this comment')
    }
    return await dbContext.Comment.findByIdAndDelete(commentId)
  }

  async findById(commentId, userId) {
    const res = await dbContext.Comment.findById(commentId)
    if (res._doc.creatorId === userId) {
      return res
    } else {
      throw new BadRequest('No comment for you!')
    }
  }

  async edit(body, commentId, userId) {
    const exists = await this.findById(commentId, userId)
    if (!exists) {
      throw new BadRequest("Comment doesn't exist.")
    }
    const oldReqBody = exists._doc
    const title = body.title
    const reqBody = oldReqBody

    const poster = reqBody.creatorId
    if (title) { reqBody.title = title }
    if (poster !== userId) {
      throw new BadRequest('You are not the creator of this comment')
    }
    return await dbContext.Comment.findByIdAndUpdate(commentId, body, { new: true })
  }

  async create(body, taskId) {
    const res = await dbContext.Task.findById(taskId)
    if (res._doc.creatorId !== body.creatorId) {
      throw new BadRequest('You do not have permission to comment on this task.')
    }
    return await dbContext.Comment.create(body)
  }

  async getTaskComments(taskId, userId) {
    const res = await dbContext.Comment.find({ task: taskId })
    if (res[0]._doc.creatorId !== userId) {
      throw new BadRequest('No comments for you.')
    }
    return res
  }
}
export const commentService = new CommentService()
