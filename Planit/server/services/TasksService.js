import { dbContext } from "../db/DbContext"

class TasksService {
  async getAll(query = {}) {
    const tasks = await dbContext.Tasks
  }
  async create(body) {
    const tasks = await dbContext.Tasks
  }
  async edit(body, id) {
    const tasks = await dbContext.Tasks
  }
  async remove(userId, id) {
    const tasks = await dbContext.Tasks
  }
}

export const tasksService = new TasksService()