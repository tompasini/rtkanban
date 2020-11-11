import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListService {
  async delete(listId, userId) {
    const exists = await this.findById(listId, userId)
    if (!exists) { throw new BadRequest('Not a valid id') }
    const poster = exists._doc.creatorId

    if (poster !== userId) {
      throw new BadRequest('You are not the creator of this list')
    }
    await dbContext.Task.deleteMany({ list: listId })
    return await dbContext.List.findByIdAndDelete(listId)
  }

  async findById(listId, userId) {
    const res = await dbContext.List.findById(listId)
    if (res._doc.creatorId === userId) {
      return res
    } else {
      throw new BadRequest('No list for you!')
    }
  }

  async edit(body, listId, userId) {
    const exists = await this.findById(listId, userId)
    if (!exists) {
      throw new BadRequest("List doesn't exist.")
    }
    const oldReqBody = exists._doc
    const title = body.title
    const reqBody = oldReqBody

    const poster = reqBody.creatorId
    if (title) { reqBody.title = title }
    if (poster !== userId) {
      throw new BadRequest('You are not the creator of this list')
    }
    return await dbContext.List.findByIdAndUpdate(listId, body, { new: true })
  }

  async create(body, boardId) {
    const res = await dbContext.Board.findById(boardId)
    if (res._doc.creatorId !== body.creatorId) {
      throw new BadRequest('You do not have permission to add a list to this board.')
    }
    return await dbContext.List.create(body)
  }

  async getBoardLists(boardId, userId) {
    const res = await dbContext.List.find({ board: boardId })
    if (res[0]._doc.creatorId !== userId) {
      throw new BadRequest('No lists for you.')
    }
    return res
  }
}
export const listService = new ListService()
