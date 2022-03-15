import { Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class NotesService {
  async getAll(projectId) {
    const notes = await dbContext.Notes.find().populate('project').populate('task').populate('creator')
    return notes.filter(n => n.projectId == projectId)
  }
  async create(body) {
    const note = await dbContext.Notes.create(body)
    await note.populate('project')
    await note.populate('task')
    await note.populate('creator')
    return note
  }
  async remove(userId, id) {
    const noteToDelete = await dbContext.Notes.findById(id)
    if (noteToDelete.creatorId.toString() !== userId) {
      throw new Forbidden('Tsk Tsk')
    }
    await dbContext.Notes.findByIdAndDelete(id)
  }

}

export const notesService = new NotesService()