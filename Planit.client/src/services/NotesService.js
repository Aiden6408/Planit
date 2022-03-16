import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class NotesService {
  async getNotes(id) {
    const res = await api.get(`api/projects/${id}/notes`)
    logger.log('[getNotes]', res.data)
    AppState.notes = res.data
  }
}

export const notesService = new NotesService()