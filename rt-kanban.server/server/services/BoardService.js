import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
// import Board from '../models/Board'

class BoardService {
  async delete(boardId) {
    // NOTE Check if user editing is the user who created the post. need to pass through current user in controller
    const exists = await this.findById(boardId)
    if (!exists) { throw new BadRequest('Not a valid id') }
    return await dbContext.Board.findByIdAndDelete(boardId)
  }

  async findById(id) {
    return await dbContext.Board.findById(id)
  }

  async edit(body, id) {
    // NOTE Check if user editing is the user who created the post. need to pass through current user in controller
    const exists = await this.findById(id)
    if (!exists) {
      throw new BadRequest("Board doesn't exist.")
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
