import { dbContext } from "../db/DbContext"

class TasksService {
  async getAll(query) {
    const tasks = await dbContext.  }
  async create(body) {
    const tasks = await dbContext.  }
  async edit(body, id) {
    const tasks = await dbContext.  }
  async remove(userId, id) {
    const tasks = await dbContext.  }
}

export const tasksService = new TasksService()