import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const TasksSchema = new Schema(
  {
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    projectId: { type: ObjectId, required: true, ref: 'Project' },
    sprintId: { type: ObjectId, required: true, ref: 'Sprint' },
    creatorId: { type: ObjectId, required: true, ref: 'Profile' },
    isComplete: { type: Boolean, default: false, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TasksSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})

TasksSchema.virtual('sprint', {
  localField: 'sprintId',
  foreignField: '_id',
  justOne: true,
  ref: 'Sprint'
})