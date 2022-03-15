
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext";
class SprintsService {
    async getAll(query = {}) {
        const sprints = await dbContext.Sprints.find(query).populate('project', 'creator')
        return sprints

    }

    async create(body) {
        const sprints = await dbContext.Sprints.create(body)
        await sprints.populate('project', 'creator')
        return sprints
    }
    async remove(userId, id) {
        const sprintsToDelete = await dbContext.Sprints.findById(id)
        if (sprintsToDelete.creatorId.tostring()
            !== userId) {
            throw new Forbidden
        } await dbContext.Sprints.findByIdAndDelete(id)
    }
}

export const sprintsService = new SprintsService();
