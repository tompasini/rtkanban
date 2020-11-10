import { api } from './AxiosService'
import { AppState } from '../AppState'

class BoardService {
  async getUserBoards() {
    try {
      const res = await api.get('api/boards/profile')
      AppState.boards = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createBoard(body) {
    try {
      await api.post('api/boards', body)
      this.getUserBoards()
    } catch (error) {
      console.error(error)
    }
  }

  async editBoard(body, id) {
    try {
      await api.put('api/boards/' + id, body)
      this.getUserBoards()
    } catch (error) {
      console.error(error)
    }
  }

  async deleteBoard(id) {
    try {
      await api.delete('api/boards/' + id)
      this.getUserBoards()
    } catch (error) {
      console.error(error)
    }
  }

  async getActiveBoard(id) {
    try {
      const res = await api.get('api/boards/' + id)
      AppState.activeBoard = res.data
    } catch (error) {
      console.error(error)
    }
  }
}
export const boardService = new BoardService()
