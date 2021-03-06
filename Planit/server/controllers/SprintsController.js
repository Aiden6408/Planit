import { Auth0Provider } from "@bcwdev/auth0provider";
import { sprintsService } from "../services/SprintsService";
import BaseController from "../utils/BaseController";

export class SprintsController extends BaseController {
    constructor() {
        super('api/projects/:projectId/sprints')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('', this.getAll)
            .post('', this.create)
            .delete('/:id', this.remove)
    }
    async getAll(req, res, next) {
        try {
            const projectId = req.params.projectId
            const sprints = await sprintsService.getAll(projectId)
            return res.send(sprints)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.projectId = req.params.projectId
            const sprints = await sprintsService.create(req.body)
            return res.send(sprints)
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const userId = req.userInfo.id
            await sprintsService.remove(userId, req.params.id)
            return res.send('sprint has been deleted')
        } catch (error) {
            next(error)
        }
    }
}