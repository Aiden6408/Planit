import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
  async getTasks(id) {
    const res = await api.get(`api/projects/${id}/tasks`)
    logger.log('[getTasks]', res.data)
    AppState.tasks = res.data
  }
  async createTask(projectId, body) {

    const res = await api.post(`api/projects/${projectId}/tasks`, body)
    logger.log(res.data, "createTask")
    AppState.tasks = [...AppState.tasks, res.data]

  }
}

export const tasksService = new TasksService()

