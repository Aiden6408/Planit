import { Auth0Provider } from "@bcwdev/auth0provider";
import { projectsService } from "../services/ProjectsService";
import BaseController from "../utils/BaseController";


export class ProjectsController extends BaseController {
    constructor() {
        super('api/projects')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('', this.getAll)
            .get('/:id', this.getById)
            .post('', this.create)
            .delete('/:id', this.remove)
    }
    async getAll(req, res, next) {
        try {
            const projects = await projectsService.getAll(req.userInfo.id)
            return res.send(projects)
        } catch (error) {
            next(error)

        }
    }
    async getById(req, res, next) {
        try {
            const project = await projectsService.getById(req.params.id)
            return res.send(project)
        } catch (error) {
            next(error)

        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const project = await projectsService.create(req.body)
            return res.send(project)
        } catch (error) {
            next(error)

        }
    }
    async remove(req, res, next) {
        try {
            const userId = req.userInfo.id
            await projectsService.remove(userId, req.params.id)
            return res.send('Project Deleted')
        } catch (error) {
            next(error)

        }
    }
}