import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ProjectSchema } from '../models/Project';
import { SprintsSchema } from '../models/Sprint';
import { TasksSchema } from "../models/Task";
import { ValueSchema } from '../models/Value'


class DbContext {
  Tasks = mongoose.model('Tasks', TasksSchema);
  Sprints = mongoose.model('Sprints', SprintsSchema);
  Projects = mongoose.model('Project', ProjectSchema);
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
