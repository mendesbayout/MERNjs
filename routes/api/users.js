const  Router  = require('express');
// User Model
const User = require('../../model/User');

const router = Router();

/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Private
 */



router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users exist');
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});




module.exports = router;