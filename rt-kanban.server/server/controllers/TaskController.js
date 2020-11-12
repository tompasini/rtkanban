import express from 'express'
import BaseController from '../utils/BaseController'
import { taskService } from '../services/TaskService'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TaskController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:listId', this.getListTasks)
      .get('/comments/:taskId', this.getActiveTask)
      .post('/:listId', this.create)
      .put('/:taskId', this.edit)
      .delete('/:taskId', this.delete)
  }

  async delete(req, res, next) {
    try {
      const currentUser = req.userInfo.id
      res.send(await taskService.delete(req.params.taskId, currentUser))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const currentUser = req.userInfo.id
      res.send(await taskService.edit(req.body, req.params.taskId, currentUser))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.list = req.params.listId
      res.send(await taskService.create(req.body, req.params.listId))
    } catch (error) {
      next(error)
    }
  }

  async getListTasks(req, res, next) {
    try {
      const currentUser = req.userInfo.id
      res.send(await taskService.getListTasks(req.params.listId, currentUser))
    } catch (error) {
      next(error)
    }
  }

  async getActiveTask(req, res, next) {
    try {
      res.send(await taskService.findById(req.params.taskId, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
