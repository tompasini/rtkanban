import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardService {
  async delete(boardId, userId) {
    const exists = await this.findById(boardId, userId)
    if (!exists) { throw new BadRequest('Not a valid id') }
    const poster = exists._doc.creatorId

    if (poster !== userId) {
      throw new BadRequest('You care not the creator of this board')
    }
    await dbContext.List.deleteMany({ board: boardId })
    return await dbContext.Board.findByIdAndDelete(boardId)
  }

  async findById(boardId, userId) {
    const res = await dbContext.Board.findById(boardId)
    if (res._doc.creatorId === userId) {
      return res
    } else {
      throw new BadRequest('No board for you!')
    }
  }

  async edit(body, id, userId) {
    const exists = await this.findById(id)
    if (!exists) {
      throw new BadRequest("Board doesn't exist.")
    }
    const oldReqBody = exists._doc
    const title = body.title
    const reqBody = oldReqBody

    const poster = reqBody.creatorId
    if (title) { reqBody.title = title }
    if (poster != userId) {
      throw new BadRequest('You are not the creator of this board')
    }
    return await dbContext.Board.findByIdAndUpdate(id, body, { new: true })
  }

  async create(body) {
    return await dbContext.Board.create(body)
  }

  async getUserBoards(userId) {
    return await dbContext.Board.find({ creatorId: userId })
  }
}
export const boardService = new BoardService()
