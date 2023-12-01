const { User } = require('../models');

const userdata = [
  {
    id:1,
    username: 'Xandromus',
    email: 'Xandromus@email.com',
    password: 'password12345',
  },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;