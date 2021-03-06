import { Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class TasksService {
  async getAll(projectId) {
    const tasks = await dbContext.Tasks.find().populate('project').populate('sprint').populate('creator')
    return tasks.filter(t => t.projectId == projectId)
  }
  async create(body) {
    const task = await dbContext.Tasks.create(body)
    await task.populate('project')
    await task.populate('sprint')
    await task.populate('creator')
    return task
  }
  async edit(body, id) {
    const original = await dbContext.Tasks.findById(id)
    if (original.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('Your not Allowed')
    }
    original.name = body.name ? body.name : original.name
    original.weight = body.weight ? body.weight : original.weight
    original.sprintId = body.sprintId ? body.sprintId : original.sprintId
    original.isComplete = body.isComplete !== '' ? body.isComplete : original.isComplete
    await original.save()
    return original
  }
  async remove(userId, id) {
    const taskToDelete = await dbContext.Tasks.findById(id)
    if (taskToDelete.creatorId.toString() !== userId) {
      throw new Forbidden('Naughty Naughty')
    }
    await dbContext.Tasks.findByIdAndDelete(id)
  }
}

export const tasksService = new TasksService()