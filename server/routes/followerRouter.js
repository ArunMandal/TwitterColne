const express = require('express');
const userFollower = require('../controllers/userFollowerController');


const router = express.Router();



router.get('/users', userFollower.fetchUsers);
router.get('/:userId', userFollower.fetchFollowers);


// To follow user
router.post('/addUserFollower',userFollower.save); 

router.post('/unfollow',userFollower.unfollow);
router.put('/addFollower/:username',userFollower.addFollower);






module.exports = router;