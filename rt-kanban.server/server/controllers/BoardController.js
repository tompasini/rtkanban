import express from 'express'
import BaseController from '../utils/BaseController'
import { boardService } from '../services/BoardService'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class BoardController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/profile', this.getUserBoards)
      .get('/:boardId', this.getActiveBoard)
      .post('', this.create)
      .put('/:boardId', this.edit)
      .delete('/:boardId', this.delete)
  }

  async delete(req, res, next) {
    try {
      let currentUser = req.userInfo.id
      res.send(await boardService.delete(req.params.boardId, currentUser))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let currentUser = req.userInfo.id
      res.send(await boardService.edit(req.body, req.params.boardId, currentUser))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await boardService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getUserBoards(req, res, next) {
    try {
      res.send(await boardService.getUserBoards(req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async getActiveBoard(req, res, next) {
    try {
      res.send(await boardService.findById(req.params.boardId, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
