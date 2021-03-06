import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class CommentService {
  async getCommentsByTask(taskId) {
    try {
      const res = await api.get('api/comments/' + taskId)
      AppState.comments[taskId] = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getActiveTask(taskId) {
    try {
      const res = await api.get('api/tasks/comments/' + taskId)
      AppState.activeTask = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async createComment(taskId, body) {
    try {
      await api.post('api/comments/' + taskId, body)
      this.getCommentsByTask(taskId)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteComment(id, comment) {
    try {
      await api.delete('api/comments/' + id)
      this.getCommentsByTask(id)
    } catch (error) {
      logger.error(error)
    }
  }
}
export const commentService = new CommentService()
