import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TaskService {
  async delete(taskId, userId) {
    const exists = await this.findById(taskId, userId)
    if (!exists) { throw new BadRequest('Not a valid id') }
    const poster = exists._doc.creatorId

    if (poster !== userId) {
      throw new BadRequest('You are not the creator of this task')
    }
    return await dbContext.Task.findByIdAndDelete(taskId)
  }

  async findById(taskId, userId) {
    const res = await dbContext.Task.findById(taskId)
    if (res._doc.creatorId === userId) {
      return res
    } else {
      throw new BadRequest('No task for you!')
    }
  }

  async edit(body, taskId, userId) {
    const exists = await this.findById(taskId, userId)
    if (!exists) {
      throw new BadRequest("Task doesn't exist.")
    }
    const oldReqBody = exists._doc
    const title = body.title
    const reqBody = oldReqBody

    const poster = reqBody.creatorId
    if (title) { reqBody.title = title }
    if (poster !== userId) {
      throw new BadRequest('You are not the creator of this task')
    }
    return await dbContext.Task.findByIdAndUpdate(taskId, body, { new: true })
  }

  async create(body, listId) {
    const res = await dbContext.List.findById(listId)
    if (res._doc.creatorId !== body.creatorId) {
      throw new BadRequest('You do not have permission to add a task to this list.')
    }
    return await dbContext.Task.create(body)
  }

  async getListTasks(listId, userId) {
    const res = await dbContext.Task.find({ list: listId })
    if (res[0]._doc.creatorId !== userId) {
      throw new BadRequest('No tasks for you.')
    }
    return res
  }
}
export const taskService = new TaskService()
