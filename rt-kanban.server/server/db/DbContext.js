import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import ProfileSchema from '../models/Profile'
import BoardSchema from '../models/Board'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Profile = mongoose.model('Profile', ProfileSchema);

  Board = mongoose.model('Board', BoardSchema)
}

export const dbContext = new DbContext()
