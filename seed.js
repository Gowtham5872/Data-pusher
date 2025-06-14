
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Role = require('./models/Role');
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Role.deleteMany({});
  await Role.insertMany([
    { role_name: 'Admin' },
    { role_name: 'Normal' }
  ]);
  console.log('Roles seeded');
  process.exit();
});
