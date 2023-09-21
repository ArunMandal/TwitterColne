const express = require('express');
const userTweets = require('../controllers/userTweetsController');


const router = express.Router();




// router.get('/',userTweets.fetchAllFollowers);
router.get('/Tweets/:UserID',userTweets.getTweetsByFollower);
router.post('/addUserTweet', userTweets.save);
router.get('/getTweets/:username',userTweets.getById);


router.get('/', userTweets.fetchAll);









module.exports = router;