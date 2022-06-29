import mongoose from 'mongoose';

import dbConnect from './env/dev.js';

mongoose.connect(dbConnect);

let db = mongoose.connection;

export default db;