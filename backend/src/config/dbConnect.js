import mongoose from 'mongoose';

import dbConnect from './env/dev.js';

mongoose.connect(dbConnect);

const db = mongoose.connection;

export default db;