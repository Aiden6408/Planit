import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";
import BaseController from "../utils/BaseController";

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes');
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.remove)
  }
  async getAll(req, res, next) {
    try {
      const projectId = req.params.projectId
      const notes = await notesService.getAll(projectId)
      return res.send(notes)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const note = await notesService.create(req.body)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      await notesService.remove(userId, req.params.id)
      return res.send('Note removed')
    } catch (error) {
      next(error)
    }
  }
}
