// dbConfig.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('Connected to database.');
}).catch((error) => {
  console.error('Database connection failed: ' + error);
});
