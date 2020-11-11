import express from 'express'
import BaseController from '../utils/BaseController'
import { commentService } from '../services/CommentService'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class CommentController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:taskId', this.getTaskComments)
      .post('/:taskId', this.create)
      .put('/:commentId', this.edit)
      .delete('/:commentId', this.delete)
  }

  async delete(req, res, next) {
    try {
      const currentUser = req.userInfo.id
      res.send(await commentService.delete(req.params.commentId, currentUser))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const currentUser = req.userInfo.id
      res.send(await commentService.edit(req.body, req.params.commentId, currentUser))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.task = req.params.taskId
      res.send(await commentService.create(req.body, req.params.taskId))
    } catch (error) {
      next(error)
    }
  }

  async getTaskComments(req, res, next) {
    try {
      const currentUser = req.userInfo.id
      res.send(await commentService.getTaskComments(req.params.taskId, currentUser))
    } catch (error) {
      next(error)
    }
  }
}
