
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext";
class SprintsService {
    async getAll(projectId) {
        const sprints = await dbContext.Sprints.find().populate('project').populate('creator')
        return sprints.filter(s => s.projectId == projectId)

    }

    async create(body) {
        const sprints = await dbContext.Sprints.create(body)
        await sprints.populate('project')
        await sprints.populate('creator')
        return sprints
    }
    async remove(userId, id) {
        const sprintToDelete = await dbContext.Sprints.findById(id)
        if (sprintToDelete.creatorId.toString() !== userId) {
            throw new Forbidden('You are not Authorized to do that!')
        }
        await dbContext.Sprints.findByIdAndDelete(id)
        return
    }
}

export const sprintsService = new SprintsService();
