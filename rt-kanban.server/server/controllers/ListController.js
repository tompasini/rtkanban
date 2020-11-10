import express from 'express'
import BaseController from '../utils/BaseController'
import { listService } from '../services/ListService'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class ListController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:boardId', this.getBoardLists)
      .post('/:boardId', this.create)
      .put('/:listId', this.edit)
      .delete('/:listId', this.delete)
  }

  async delete(req, res, next) {
    try {
      const currentUser = req.userInfo.id
      res.send(await listService.delete(req.params.listId, currentUser))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const currentUser = req.userInfo.id
      res.send(await listService.edit(req.body, req.params.listId, currentUser))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.board = req.params.boardId
      res.send(await listService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getBoardLists(req, res, next) {
    try {
      res.send(await listService.getBoardLists(req.params.boardId))
    } catch (error) {
      next(error)
    }
  }
}
