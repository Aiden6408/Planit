import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
  async getTasks(id) {
    const res = await api.get(`api/projects/${id}/tasks`)
    logger.log('[getTasks]', res.data)
    AppState.tasks = res.data
  }
  getWeight(sprintId) {
    //FIXME 
    let weightTasks = AppState.tasks.filter(t => t.sprintId == sprintId)
  }
  async createTask(projectId, body) {

    const res = await api.post(`api/projects/${projectId}/tasks`, body)
    logger.log(res.data, "createTask")
    AppState.tasks = [...AppState.tasks, res.data]

  }
  async deleteTask(projectId, taskId) {

    const res = await api.delete(`api/projects/${projectId}/tasks/${taskId}`)
    logger.log('[deleteTask]', res.data)
    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId)
  }
  async editTask(projectId, taskId, body) {
    const update = AppState.tasks.findIndex(t => t.id == taskId)
    const res = await api.put(`api/projects/${projectId}/tasks/${taskId}`, body)
    logger.log('[editTask]', res.data)
    AppState.tasks.splice(update, 1, res.data)
    AppState.activeTask = res.data
  }
}

export const tasksService = new TasksService()

