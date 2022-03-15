import { Auth0Provider } from "@bcwdev/auth0provider";
import { sprintsService } from "../services/SprintsService";
import BaseController from "../utils/BaseController";

export class SprintsCoontroller extends BaseController {
    constructor() {
        super('api/projects/:projectId/sprints')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('/:id', this.getById)
            .post('', this.create)
            .delete('/:id', this.remove)
    }
    async getAll(req, res, next) {
        try {
            const sprints = await sprintsService.getAll(req.query)
            return res.send(sprints)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const sprints = await sprintsService.create(req.body)
            return res.send(sprints)
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const userId = req.userInfor.id
            await sprintsService.remove(userId, req.params.id)
            return res.send('sprint has been deleted')


        } catch (error) {
            next(error)
        }
    }
}