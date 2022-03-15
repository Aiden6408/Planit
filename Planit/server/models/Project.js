import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const ProjectSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        creatorId: { type: ObjectId, required: true, ref: 'Profile' }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

ProjectSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})
