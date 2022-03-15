import { Auth0Provider } from "@bcwdev/auth0provider";
import { tasksService } from "../services/TasksService";
import BaseController from "../utils/BaseController";

export class TasksController extends BaseController {
  constructor() {
    super('api/projects/:projectId/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }
  async getAll(req, res, next) {
    try {
      const projectId = req.params.projectId
      const tasks = await tasksService.getAll(projectId)
      return res.send(tasks)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.projectId = req.params.projectId
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.create(req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const taskToEdit = await tasksService.edit(req.body, req.params.id)
      return res.send(taskToEdit)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      await tasksService.remove(userId, req.params.id)
      return res.send('Deleted Task')
    } catch (error) {
      next(error)
    }
  }
}
