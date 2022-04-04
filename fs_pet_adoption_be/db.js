
const mongoose = require('mongoose');
const process = require('process');

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB}`);

