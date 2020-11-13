import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class ListService {
  async getListsByBoard(boardId) {
    try {
      const res = await api.get('api/lists/' + boardId)
      AppState.lists = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async createList(boardId, body) {
    try {
      await api.post('api/lists/' + boardId, body)
      this.getListsByBoard(boardId)
    } catch (error) {
      logger.error(error)
    }
  }

  async editList(body, id, board) {
    try {
      body.board = board
      await api.put('api/lists/' + id, body)
      this.getListsByBoard(board)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteList(id, board) {
    try {
      await api.delete('api/lists/' + id)
      this.getListsByBoard(board)
    } catch (error) {
      logger.error(error)
    }
  }
}
export const listService = new ListService()
