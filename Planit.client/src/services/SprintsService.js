import { api } from "./AxiosService"

class SprintsService {
    async getSprints(id) {
        const res = await api.get(`api/projects/${id}/sprints`)
    }

}
export const sprintsService = new SprintsService()