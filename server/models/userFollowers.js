const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserFollowerSchema = new Schema({
    

    UserID: String,
    Followers: [{type: Schema.Types.ObjectId, ref: 'User'}]
});



//Product => product + 's' => products
module.exports = mongoose.model('UserFollower', UserFollowerSchema);