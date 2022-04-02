import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const NotesSchema = new Schema({
  body: { type: String, required: true },
  taskId: { type: ObjectId, ref: 'Task' },
  projectId: { type: ObjectId, required: true, ref: 'Project' },
  creatorId: { type: ObjectId, required: true, ref: 'Profile' }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

NotesSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})

NotesSchema.virtual('task', {
  localField: 'taskId',
  foreignField: '_id',
  justOne: true,
  ref: 'Task'
})

NotesSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})