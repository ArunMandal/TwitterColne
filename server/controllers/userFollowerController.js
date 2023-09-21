const Users = require('../models/user');
const UserFollowers = require('../models/userFollowers');

exports.fetchUsers = async (req, res, next) => {
    const users = await Users.find();
    res.status(200).json(users);
};


exports.fetchFollowers = async (req, res, next) => {
   const uid=req.params.userId;
   console.log(uid);
    const followers = await UserFollowers.findOne({UserID:uid}).populate({
      path: 'Followers',
      select: 'username'
    });
    res.status(200).json(followers); 
};

exports.save = async (req, res, next) => {
    const { UserID, Followers } = req.body;

    console.log(UserID);
 const usr=await UserFollowers.findOne({UserID:UserID});
  console.log(usr);
 if(!usr){
   console.log('new');
  const newUserFollower = new UserFollowers({
    UserID,
    Followers
  });

  newUserFollower.save()
    .then(savedUserFollower => {
      console.log('Saved user follower:', savedUserFollower);
      res.status(201).json(savedUserFollower);
    })
    .catch(error => {
      console.error('Error saving user follower:', error);
      res.status(500).json({ error: 'Failed to save user follower' });
    });

 }
 else{
  console.log('old');
  UserFollowers.findOneAndUpdate(
    { UserID: UserID },
    { $addToSet: { Followers: Followers } }, // Use $addToSet to ensure unique values
    { new: true }
  )
    .then(updatedUserFollower => {
      if (updatedUserFollower) {
        console.log('Updated user follower:', updatedUserFollower);
        res.status(200).json(updatedUserFollower);
      } else {
        res.status(404).json({ error: 'User follower not found' });
      }
    })
    .catch(error => {
      console.error('Error updating user follower:', error);
      res.status(500).json({ error: 'Failed to update user follower' });
    });

 }
    

  
    
  };



  exports.unfollow = async (req, res, next) => {
    const { UserID, Followers } = req.body;
    console.log('jam--')
 console.log(UserID)
 console.log(Followers)
    UserFollowers.findOneAndUpdate(
      { UserID: UserID },
      { $pull: { Followers: Followers } },
      { new: true }
    )
      .then(updatedUserFollower => {
        if (updatedUserFollower) {
          console.log('Updated user follower:', updatedUserFollower);
          res.status(200).json(updatedUserFollower);
        } else {
          res.status(404).json({ error: 'User follower not found' });
        }
      })
      .catch(error => {
        console.error('Error updating user follower:', error);
        res.status(500).json({ error: 'Failed to update user follower' });
      });
 
 
    

  
    
  };



  exports.removeFollower= async (req, res, next) => {
    const { username } = req.params;
    const { followerId } = req.body;
  
    UserFollowers.findOneAndUpdate(
      { UserName: username },
      { $pull: { Followers: followerId } },
      { new: true }
    )
      .then(updatedUserFollower => {
        if (updatedUserFollower) {
          console.log('Updated user follower:', updatedUserFollower);
          res.status(200).json(updatedUserFollower);
        } else {
          res.status(404).json({ error: 'User follower not found' });
        }
      })
      .catch(error => {
        console.error('Error updating user follower:', error);
        res.status(500).json({ error: 'Failed to update user follower' });
      });
  };


  exports.addFollower= async (req, res, next) =>  {
    const { username } = req.params;
    const { followerId } = req.body;
  
    UserFollowers.findOneAndUpdate(
      { UserName: username },
      { $addToSet: { Followers: followerId } }, // Use $addToSet to ensure unique values
      { new: true }
    )
      .then(updatedUserFollower => {
        if (updatedUserFollower) {
          console.log('Updated user follower:', updatedUserFollower);
          res.status(200).json(updatedUserFollower);
        } else {
          res.status(404).json({ error: 'User follower not found' });
        }
      })
      .catch(error => {
        console.error('Error updating user follower:', error);
        res.status(500).json({ error: 'Failed to update user follower' });
      });
  };

