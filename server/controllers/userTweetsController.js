


const UserTweets = require('../models/userTweets');
const UserFollowers = require('../models/userFollowers');

exports.fetchAllFollowers = async (req, res, next) => {
  const followers = await UserFollowers.findOne({ "UserName": "arun" }).populate('Followers');
  res.status(200).json(followers.Followers);
};



exports.fetchAll = async (req, res, next) => {

  const tweets = await UserTweets.find();
  res.status(200).json(tweets);
};


exports.save = async (req, res, next) => {
  const { UserName, Tweet } = req.body;

  const newUserTweet = new UserTweets({
    UserName,
    Tweet
  });

  // newUserTweet.save()
  //   .then(savedUserTweet => {
  //    // console.log('Saved user tweet:', savedUserTweet);
  //     res.status(201).json(savedUserTweet);
  //   })
  //   .catch(error => {
  //     console.error('Error saving user tweet:', error);
  //     res.status(500).json({ error: 'Failed to save user tweet' });
  //   });




  newUserTweet.save()
  .then(savedUserTweet => {
    // Use populate to fetch the associated user document
    UserTweets.populate(savedUserTweet, { path: 'UserName',select: 'username' })
      .then(populatedUserTweet => {
        // Send the populated response
        res.status(201).json(populatedUserTweet);
      })
      .catch(error => {
        console.error('Error populating user tweet:', error);
        res.status(500).json({ error: 'Error populating user tweet' });
      });
  })
  .catch(error => {
    console.error('Error saving user tweet:', error);
    res.status(500).json({ error: 'Error saving user tweet' });
  });
};

exports.getById = (req, res) => {
  const { username } = req.params;

  UserTweets.find({ UserName: username })
    .then(tweets => {
      console.log('Found tweets:', tweets);
      res.status(200).json(tweets);
    })
    .catch(error => {
      console.error('Error finding tweets:', error);
      res.status(500).json({ error: 'Failed to retrieve tweets' });
    });
};

exports.getTweetsByFollower = async (req, res) => {
  try {
    const { UserID } = req.params;
    console.log(UserID);

    const userFollowers = await UserFollowers.findOne({ UserID: UserID }).populate('Followers');
    userFollowers.Followers.push(UserID);

    if (!userFollowers) {
      return res.status(404).json({ error: 'User not found' });
    }




    async function getFollowersWithTweets() {
      try {
        const followersWithTweets = await UserTweets.find({ UserName: { $in: userFollowers.Followers.map(x => x._id) } })
          .populate({
            path: 'UserName',
            select: 'username'
          })
          .sort({ createdAt: -1 })
          .exec();

        return followersWithTweets;
      } catch (error) {
        // Handle error
        console.error(error);
        return null;
      }
    }

    // Call the function and store the result in a variable
    const result = await getFollowersWithTweets();


    console.log(result);


    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error ' });
  }
};
