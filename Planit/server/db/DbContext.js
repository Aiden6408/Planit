import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { NotesSchema } from "../models/Note";
import { ProjectSchema } from '../models/Project';
import { SprintsSchema } from '../models/Sprint';
import { TasksSchema } from "../models/Task";
import { ValueSchema } from '../models/Value'


class DbContext {
  Notes = mongoose.model('Note', NotesSchema);
  Tasks = mongoose.model('Task', TasksSchema);
  Sprints = mongoose.model('Sprint', SprintsSchema);
  Projects = mongoose.model('Project', ProjectSchema);
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
