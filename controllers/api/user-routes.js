const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.error(err); // Log the entire error object for debugging

    // Check if the error is due to a unique constraint violation (duplicate username or email)
    if (err.name === 'SequelizeUniqueConstraintError') {
      const errorMessages = err.errors.map((error) => error.message);

      // Check for specific error messages and respond accordingly
      if (errorMessages.includes('username must be unique')) {
        res.status(400).json({ error: 'Username already exists' });
      } else if (errorMessages.includes('email must be unique')) {
        res.status(400).json({ error: 'Email already exists' });
      } else {
        res.status(500).json(err);
      }
    } else {
      res.status(500).json(err);
    }
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ error: 'Incorrect username or password' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ error: 'Incorrect username or password' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
