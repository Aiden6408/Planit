import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext";

class ProjectsService {
    async getAll(id) {
        const projects = await dbContext.Projects.find({ creatorId: id }).populate('creator')
        return projects
    }
    async getById(id) {
        const project = await dbContext.Projects.findById(id).populate('creator')
        if (!project) {
            throw new BadRequest('Invalid Id')
        }
        return project
    }
    async create(body) {
        const project = await dbContext.Projects.create(body)
        await project.populate('creator')
        return project
    }
    async remove(userId, id) {
        const projectToDelete = await dbContext.Projects.findById(id)
        if (projectToDelete.creatorId.toString() !== userId) {
            throw new Forbidden
        }
        await dbContext.Projects.findByIdAndDelete(id)
    }

}
export const projectsService = new ProjectsService()