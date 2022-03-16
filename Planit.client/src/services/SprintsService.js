import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {
    async getSprints(id) {
        const res = await api.get(`api/projects/${id}/sprints`)
        logger.log('[getSprints]', res.data)
        AppState.sprints = res.data
    }
    async createSprint(id, body) {
        const res = await api.post(`api/projects/${id}/sprints`, body)
        logger.log("creat sprint", res.data)
        AppState.sprints = [...AppState.sprints, res.data]
    }
    async deleteSprint(projectId, sprintId) {
        const res = await api.delete(`api/projects/${projectId}/sprints/${sprintId}`)
        logger.log(res.data, "delete sprint")
        AppState.sprints = AppState.sprints.filter(s => s.id !== sprintId)

    }
}
export const sprintsService = new SprintsService()