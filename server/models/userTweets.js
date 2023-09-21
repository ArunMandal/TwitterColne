const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserTweetsSchema = new Schema({
    
    Tweet: String,
    UserName: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, default: Date.now }
   
});



//Product => product + 's' => products
module.exports = mongoose.model('UserTweet', UserTweetsSchema);