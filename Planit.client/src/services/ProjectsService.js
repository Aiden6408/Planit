import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService {
  async getAllProjects() {
    const res = await api.get('api/projects')
    logger.log(res.data)
    AppState.projects = res.data
  }
  async deleteProject(id) {
    const res = await api.delete(`api/projects/${id}`)
    logger.log(res.data)
    AppState.projects = AppState.projects.filter(p => p.id != id)
    //FIXME check if solves router push issue rather than another api request
  }
}
export const projectsService = new ProjectsService()