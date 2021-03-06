import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class TaskService {
  async getTasksByList(listId) {
    try {
      const res = await api.get('api/tasks/' + listId)
      AppState.tasks[listId] = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async createTask(listId, body) {
    try {
      await api.post('api/tasks/' + listId, body)
      this.getTasksByList(listId)
    } catch (error) {
      logger.error(error)
    }
  }

  async editTask(body, id, list) {
    try {
      body.list = list
      await api.put('api/tasks/' + id, body)
      this.getTasksByList(list)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteTask(id, list) {
    try {
      await api.delete('api/tasks/' + id)
      this.getTasksByList(list)
    } catch (error) {
      logger.error(error)
    }
  }

  async updateList(oldList, listId, title, taskId) {
    try {
      const body = {
        title: title,
        list: listId
      }
      await api.put('api/tasks/' + taskId, body)
      this.getTasksByList(oldList)
      this.getTasksByList(listId)
    } catch (error) {
      logger.error(error)
    }
  }
}
export const taskService = new TaskService()
