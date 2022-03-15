import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const SprintsSchema = new Schema({
    name: { type: String, required: true },
    projectId: { type: ObjectId, ref: 'Project' },
    creatorId: { type: ObjectId, required: true, ref: 'Profile' },
},
    { timestamps: true, toJSON: { virtuals: true } })
SprintsSchema.virtual('project', {
    localField: 'projectId',
    foreignField: '_id',
    justOne: true,
    ref: 'Project'

})
SprintsSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})
