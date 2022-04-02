import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class NotesService {
  async getNotes(taskId) {
    const res = await api.get(`api/projects/${taskId}/notes`)
    logger.log('[getNotes]', res.data)
    AppState.notes = res.data
  }
  async createNote(taskId, body) {

    const res = await api.post(`api/projects/${taskId}/notes`, body)
    AppState.notes = [...AppState.notes, res.data]
    logger.log('added notes to appstate', res.data)
  }
  async deleteNote(projectId, noteId) {
    const res = await api.delete(`api/projects/${projectId}/notes/${noteId}`)
    logger.log(res.data)
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)

  }
  noteCount(id) {
    const myNotes = AppState.notes.filter(n => n.taskId == id)
    return myNotes.length
  }
}

export const notesService = new NotesService()